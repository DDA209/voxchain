'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useVoting } from '@/context/VotingContext';
import { useRouter } from 'next/navigation';
import {
	// useChainId,
	useReadContract,
} from 'wagmi';
import { Address, parseAbiItem } from 'viem';
import votingAbi from '@/abi/votingAbi.json';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { BaseError } from 'viem';
// import WorkflowStatus from '@/components/shared/WorkflowStatus';
import { WorkflowStatusEnum } from '../../../data/enums';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import {
	VoterRegisteredEventInterface,
	// VoterRegisteredEventInterface,
	VoterRegisteredLogInterface,
} from '../../../data/interfaces/events.interface';
// import { CONTRACT_CONFIG } from '@/config/contracts';
import { publicClient } from '@/lib/client';
import { useTranslation } from 'react-i18next';
import {
	Card,
	// CardAction,
	CardContent,
	// CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const AdminPage = () => {
	const [voterAddress, setVoterAddress] = useState<string>('');

	const [voterRegisteredLogs, setVoterRegisteredLogs] = useState<
		VoterRegisteredLogInterface[]
	>([]);
	const [loadingVoterRegisteredLogs, setLoadingVoterRegisteredLogs] =
		useState(false);

	const [loadingRegistringVoter, setLoadingRegistringVoter] = useState(false);
	const [loadingChangeStatus, setLoadingChangeStatus] = useState(false);

	const { isConnected, address: userAddress, workflowStatus } = useVoting();
	const router = useRouter();
	const { t } = useTranslation();

	// 1. Hooks MUST be at the top level
	const { data: ownerAddress, isPending: isOwnerLoading } = useReadContract({
		address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
		abi: votingAbi,
		functionName: 'owner',
		query: { enabled: isConnected },
	});

	const {
		data: hash,
		isPending: isPendingWriteContract,
		writeContractAsync,
	} = useWriteContract();

	const { isLoading: isPendingWait } = useWaitForTransactionReceipt({ hash });

	// const chainId = useChainId();
	// const contractConfig =
	// 	CONTRACT_CONFIG[chainId as keyof typeof CONTRACT_CONFIG];
	// const fromBlock = contractConfig?.fromBlock || 'latest';
	const fromBlock = 0n;
	const toBlock = 'latest';

	const changeStatusFunction = (status: number) => {
		let contractFunction;
		switch (status) {
			case WorkflowStatusEnum.ProposalsRegistrationStarted:
				contractFunction = 'startProposalsRegistering';
			case WorkflowStatusEnum.ProposalsRegistrationEnded:
				contractFunction = 'endProposalsRegistering';
			case WorkflowStatusEnum.VotingSessionStarted:
				contractFunction = 'startVotingSession';
			case WorkflowStatusEnum.VotingSessionEnded:
				contractFunction = 'endVotingSession';
			case WorkflowStatusEnum.VotesTallied:
				contractFunction = 'tallyVotes';
			case WorkflowStatusEnum.RegisteringVoters:
			default:
				contractFunction = '';
				return contractFunction;
		}
	};

	const getVoterRegisteredEvents = async () => {
		try {
			const voterRegistredEvents = (await publicClient.getLogs({
				address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
				event: parseAbiItem(
					'event VoterRegistered(address voterAddress)',
				),
				fromBlock,
				toBlock,
			})) as VoterRegisteredEventInterface[];
			await setTimeout(() => {
				console.log(voterRegistredEvents);
			}, 2000);
			const logs: VoterRegisteredLogInterface[] =
				voterRegistredEvents.map(
					(event: VoterRegisteredEventInterface) => ({
						blockNumber: 0n,
						blockTimestamp: 0n,
						voterAddress:
							(event.args.voterAddress as Address) ?? '',
					}),
				);
			setVoterRegisteredLogs(logs);
		} catch (error) {
			console.error('Error fetching VoterRegistered events:', error);
			setVoterRegisteredLogs([]);
		} finally {
			setLoadingVoterRegisteredLogs(false);
		}
	};

	const { isSuccess: isConfirmed, error: errorConfirmation } =
		useWaitForTransactionReceipt({ hash });

	useEffect(() => {
		// Rediriger si on est connecté, que la vérification est terminée, et que l'utilisateur n'est pas l'admin
		if (
			isConnected &&
			!isOwnerLoading &&
			ownerAddress &&
			ownerAddress !== userAddress
		) {
			router.push('/');
		}
		setTimeout(() => getVoterRegisteredEvents(), 2000);
	}, [isConnected, isOwnerLoading, ownerAddress, userAddress, router]);

	useEffect(() => {
		if (isConfirmed) {
			getVoterRegisteredEvents();
		}
	}, [isConfirmed]);

	// 2. Early return MUST come AFTER all hook declarations
	if (
		isOwnerLoading ||
		(isConnected && ownerAddress && ownerAddress !== userAddress)
	) {
		return null;
	}

	const handleChangeStatus = async () => {
		if (writeContractAsync) {
			setLoadingChangeStatus(true);
			await toast.promise(
				writeContractAsync({
					address: process.env
						.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
					abi: votingAbi,
					functionName: changeStatusFunction(workflowStatus + 1),
				}),
				{
					loading: 'Changement de statut en cours...',
					success:
						'Changement de statut terminé avec succès ! dans la trasaction ' +
						hash +
						'. Le nouveau statut est ' +
						t('workflowStatusLabels.' + (workflowStatus + 1)),
					error: (error: BaseError) =>
						`Erreur : ${error.shortMessage || error.message || 'Erreur inconnue'}`,
				},
			);
			setLoadingChangeStatus(false);
		}
	};

	const handleAddVoter = async (voterAddress: string) => {
		if (voterAddress && writeContractAsync) {
			setLoadingRegistringVoter(true);
			await toast.promise(
				writeContractAsync({
					address: process.env
						.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
					abi: votingAbi,
					functionName: 'addVoter',
					args: [voterAddress],
				}),
				{
					loading: "Ajout de l'électeur en cours...",
					success:
						"L'électeur a été ajouté avec succès ! dans la trasaction " +
						hash,
					error: (error: BaseError) =>
						`Erreur : ${error.shortMessage || error.message || 'Erreur inconnue'}`,
				},
			);
			setVoterAddress('');
			setLoadingRegistringVoter(false);
			if (isConfirmed && !errorConfirmation) {
				setLoadingVoterRegisteredLogs(true);
				setTimeout(() => getVoterRegisteredEvents(), 2000);
				setLoadingVoterRegisteredLogs(false);
			}
		}
	};

	return (
		<>
			{/* <WorkflowStatus currentStatus={workflowStatus} /> */}

			<Card>
				<CardHeader>
					<CardTitle>
						{t('workflowStatusLabels.' + workflowStatus)}
					</CardTitle>
				</CardHeader>
				<CardContent className='grow'>
					<div className='flex flex-col gap-4 h-full'>
						<Input
							value={voterAddress}
							placeholder="Adresse de l'électeur au format 0x... ou ENS"
							type='text'
							disabled={
								!isConnected &&
								workflowStatus !==
									WorkflowStatusEnum.RegisteringVoters
							}
							onChange={(e) => setVoterAddress(e.target.value)}
						/>

						<Button
							disabled={
								isOwnerLoading ||
								isPendingWriteContract ||
								isPendingWait ||
								workflowStatus !==
									WorkflowStatusEnum.RegisteringVoters
							}
							onClick={() => handleAddVoter(voterAddress)}
						>
							{
								loadingRegistringVoter ? (
									<>
										<Spinner />
										Enregistrement...
									</>
								) : (
									"Ajouter l'électeur"
								) /* TODO: add spinner */
							}
						</Button>
						<div
							id='logs'
							className='flex flex-col h-full border border-gray-200 rounded-md p-2'
						>
							{voterRegisteredLogs.length > 0 ? (
								voterRegisteredLogs.map((log, index) => (
									<div key={index}>
										<p>
											{index +
												1 +
												'. Voter ' +
												log.voterAddress +
												', Block ' +
												(log.blockNumber?.toString() ??
													'')}
										</p>
									</div>
								))
							) : (
								<p>Aucun électeur enregistré</p>
							)}
							{loadingVoterRegisteredLogs && <Spinner />}
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button
						variant='outline'
						disabled={
							isOwnerLoading ||
							isPendingWriteContract ||
							isPendingWait
						}
						onClick={handleChangeStatus}
					>
						{isPendingWriteContract ? (
							<>
								<Spinner />
								{"... Changement d'étape"}
							</>
						) : (
							t('workflowStatusLabels.' + (workflowStatus + 1))
						)}
					</Button>
				</CardFooter>
			</Card>
		</>
	);
};

export default AdminPage;
