import { Address } from 'viem';
import { WorkflowStatusEnum } from '../enums';

export interface EventBasisInterface {
	address: Address; //contract address
	blockNumber: bigint;
	blockHash: string;
	blockTimestamp: number | bigint | undefined;
	data: string;
	logIndex: number;
	removed: boolean;
	topics: string[];
	transactionHash: string;
	transactionIndex: number;
}

/* EVENTS INTERFACES */
export interface VoterRegisteredEventInterface extends EventBasisInterface {
	args: { voterAddress: Address };
}

export interface WorkflowStatusChangeEventInterface extends EventBasisInterface {
	args: { previousStatus: WorkflowStatusEnum; newStatus: WorkflowStatusEnum };
}

export interface ProposalRegisteredEventInterface extends EventBasisInterface {
	args: { proposalId: bigint };
}

export interface VotedEventInterface extends EventBasisInterface {
	args: { voter: Address; proposalId: bigint };
}

/* LOGS INTERFACES */
export interface LogBasisInterface {
	blockNumber?: bigint;
	blockHash?: string;
	blockTimestamp?: number | bigint | undefined;
}

export interface VoterRegisteredLogInterface extends LogBasisInterface {
	voterAddress: Address;
}

export interface WorkflowStatusChangeLogInterface extends LogBasisInterface {
	previousStatus: WorkflowStatusEnum;
	newStatus: WorkflowStatusEnum;
}

export interface ProposalRegisteredLogInterface extends LogBasisInterface {
	voterAddress: Address;
	proposalId: bigint;
}

export interface VotedLogInterface extends LogBasisInterface {
	voter: Address;
	proposalId: bigint;
}
