/**
 * @description Workflow status enum
 * @export
 * @enum {number}
 */
export enum WorkflowStatusEnum {
	RegisteringVoters,
	ProposalsRegistrationStarted,
	ProposalsRegistrationEnded,
	VotingSessionStarted,
	VotingSessionEnded,
	VotesTallied,
}
