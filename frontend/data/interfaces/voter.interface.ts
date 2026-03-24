import { Address } from 'viem';

export interface VoterInterface {
	address: Address;
	isRegistered: boolean;
	hasVoted: boolean;
	hasProposed: boolean;
	votedProposalId: number;
}
