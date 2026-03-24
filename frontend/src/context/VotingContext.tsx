'use client';

import React, { createContext, useContext } from 'react';
import { useConnection, useReadContract } from 'wagmi';
import { Address } from 'viem';
import votingAbi from '@/abi/votingAbi.json';
import { WorkflowStatusEnum } from '../../data/enums';

interface Voter {
	isRegistered: boolean;
	hasVoted: boolean;
	hasProposed: boolean;
	votedProposalId: bigint;
}

interface VotingContextType {
	isConnected: boolean;
	address: Address | undefined;
	workflowStatus: WorkflowStatusEnum;
	isAdmin: boolean;
	isVoter: boolean;
	voterInfo: Voter | undefined;
	refetchVoter: () => void;
	refetchWorkflowStatus: () => void;
}

const VotingContext = createContext<VotingContextType>({
	isConnected: false,
	address: undefined,
	workflowStatus: WorkflowStatusEnum.RegisteringVoters,
	isAdmin: false,
	isVoter: false,
	voterInfo: undefined,
	refetchVoter: () => {},
	refetchWorkflowStatus: () => {},
});

export const VotingProvider = ({ children }: { children: React.ReactNode }) => {
	const { address, isConnected } = useConnection();
	const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address;

	const { data: workflowStatusData, refetch: refetchWorkflowStatus } =
		useReadContract({
			address: contractAddress,
			abi: votingAbi,
			functionName: 'workflowStatus',
			query: { enabled: isConnected },
		});

	const { data: ownerAddress } = useReadContract({
		address: contractAddress,
		abi: votingAbi,
		functionName: 'owner',
		query: { enabled: isConnected },
	});

	const {
		data: voterData,
		isError: isVoterError,
		refetch: refetchVoter,
	} = useReadContract({
		address: contractAddress,
		abi: votingAbi,
		functionName: 'getVoter',
		args: address ? [address] : undefined,
		query: {
			enabled: isConnected && !!address,
			retry: false, // On ne ré-essaie pas si ça throw une erreur (c'est que l'adresse n'est pas voter)
		},
	});

	const isAdmin = isConnected && ownerAddress === address;
	const voterInfo = voterData as Voter | undefined;
	const isVoter =
		isConnected && !isVoterError && voterInfo?.isRegistered === true;
	const workflowStatus: WorkflowStatusEnum =
		workflowStatusData !== undefined
			? Number(workflowStatusData)
			: WorkflowStatusEnum.RegisteringVoters;

	return (
		<VotingContext.Provider
			value={{
				isConnected,
				address,
				workflowStatus,
				isAdmin,
				isVoter,
				voterInfo,
				refetchVoter,
				refetchWorkflowStatus,
			}}
		>
			{children}
		</VotingContext.Provider>
	);
};

export const useVoting = () => useContext(VotingContext);

