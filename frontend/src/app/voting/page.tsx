'use client';

import { useVoting } from '@/context/VotingContext';
import WorkflowStatus from '../../components/shared/WorkflowStatus';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../components/ui/card';
import { WorkflowStatusEnum } from '../../../data/enums';
import { Button } from '../../components/ui/button';
import { Spinner } from '../../components/ui/spinner';
import { useEffect, useState } from 'react';
import { VoterInterface } from '../../../data/interfaces';
import { Alert } from '../../components/ui/alert';
import { useConnection } from 'wagmi';
import votingAbi from '@/abi/votingAbi.json';
import { publicClient } from '@/lib/client';
import { Address } from 'viem';
import { Textarea } from '../../components/ui/textarea';
import ProposalsStep from './ProposalsStep';
import VotingStep from './VotingStep';
import ResultsStep from './ResultsStep';

const Voting = () => {
	const { workflowStatus } = useVoting();
	const { address } = useConnection();

	const [voter, setVoter] = useState<VoterInterface | null>(null);
	const [isLoadingVoter, setIsLoadingVoter] = useState(!!address);
	const [proposalDescription, setProposalDescription] = useState<string>('');
	const [loadingRegistringProposal, setLoadingRegistringProposal] =
		useState(false);
	const { isVoter } = useVoting();
	console.log(address);

	useEffect(() => {
		const fetchVoter = async () => {
			if (!address || !isVoter) {
				setIsLoadingVoter(false);
				return;
			}
			setIsLoadingVoter(true);
			try {
				const data = (await publicClient.readContract({
					address: process.env
						.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
					abi: votingAbi,
					functionName: 'getVoter',
					args: [address],
				})) as unknown as VoterInterface;
				setVoter(data);
			} finally {
				setIsLoadingVoter(false);
			}
		};

		fetchVoter();
	}, [address, isVoter]);

	const handleAddProposal = (proposalDescription: string) => {
		if (
			proposalDescription.trim() === '' ||
			proposalDescription.trim() === null ||
			proposalDescription.trim() === undefined ||
			proposalDescription.trim().length < 5
		) {
			return;
		}

		setLoadingRegistringProposal(true);

		setLoadingRegistringProposal(false);
	};

	const renderStep = () => {
		switch (workflowStatus) {
			case WorkflowStatusEnum.ProposalsRegistrationStarted:
				return <ProposalsStep />;
			case WorkflowStatusEnum.VotingSessionStarted:
				return <VotingStep />;
			case WorkflowStatusEnum.VotingSessionEnded:
				return <ResultsStep />;
			case WorkflowStatusEnum.RegisteringVoters:
			default:
				return null;
		}
	};

	return (
		<div className='flex-1 py-24 px-4 flex flex-col gap-2 max-w-7xl mx-auto'>
			<WorkflowStatus currentStatus={workflowStatus} />
			{renderStep()}
		</div>
		// <>
		// 	{isLoadingVoter ? (
		// 		<div className='flex-1 py-24 px-4 flex justify-center items-center'>
		// 			<Spinner />
		// 		</div>
		// 	) : (
		// 		<>
		// 			{!voter?.hasProposed &&
		// 			workflowStatus ===
		// 				WorkflowStatusEnum.ProposalsRegistrationStarted ? (
		// 				<div className='flex-1 py-24 px-4 flex flex-col gap-2'>
		// 					<Alert
		// 						title="Vous n'êtes pas enregistré. Vous devez vous faire enregistrer pour voter"
		// 						variant='destructive'
		// 					/>
		// 				</div>
		// 			) : (
		// 				<div className='flex-1 py-24 px-4 flex flex-col gap-2'>
		// 					<h1 className='text-2xl font-bold'>Votation</h1>
		// 					{/* Afficher le statut du workflow */}
		// 					<WorkflowStatus currentStatus={workflowStatus} />
		// 					{/* Afficher l'enregistrement d'une proposition */}
		// 					{workflowStatus ===
		// 						WorkflowStatusEnum.ProposalsRegistrationStarted && (
		// 						<Card>
		// 							<CardHeader>
		// 								<CardTitle>
		// 									Enregistrement d&apos;une
		// 									proposition
		// 								</CardTitle>
		// 							</CardHeader>
		// 							<CardContent className='grow'>
		// 								<Textarea
		// 									value={proposalDescription}
		// 									onChange={(e) =>
		// 										setProposalDescription(
		// 											e.target.value,
		// 										)
		// 									}
		// 									placeholder='Description de la proposition'
		// 								/>
		// 								<Button
		// 									onClick={() =>
		// 										handleAddProposal(
		// 											proposalDescription,
		// 										)
		// 									}
		// 									disabled={loadingRegistringProposal}
		// 								>
		// 									{loadingRegistringProposal ? (
		// 										<Spinner />
		// 									) : (
		// 										'Ajouter la proposition'
		// 									)}
		// 								</Button>
		// 							</CardContent>
		// 						</Card>
		// 					)}
		// 				</div>
		// 			)}
		// 		</>
		// 	)}
		// </>
	);
};

export default Voting;

