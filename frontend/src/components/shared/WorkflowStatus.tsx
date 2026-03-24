import { WorkflowStatusEnum } from '../../../data/enums';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface WorkflowStatusProps {
	currentStatus: WorkflowStatusEnum;
}

const WorkflowStatus = ({ currentStatus }: WorkflowStatusProps) => {
	const { t } = useTranslation();

	/**
	 * Map each workflow status to a premium color scheme
	 */
	const getStatusStyles = (status: WorkflowStatusEnum) => {
		switch (status) {
			case WorkflowStatusEnum.RegisteringVoters:
				return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
			case WorkflowStatusEnum.ProposalsRegistrationStarted:
				return 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800';
			case WorkflowStatusEnum.ProposalsRegistrationEnded:
				return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800';
			case WorkflowStatusEnum.VotingSessionStarted:
				return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800';
			case WorkflowStatusEnum.VotingSessionEnded:
				return 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800';
			case WorkflowStatusEnum.VotesTallied:
				return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800';
			default:
				return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
		}
	};

	return (
		<div className='flex items-center gap-4 my-8 p-4 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300 hover:shadow-md animate-in fade-in slide-in-from-bottom-2 duration-700'>
			<div className='flex flex-col gap-0.5'>
				<div className='flex items-center gap-2.5'>
					<span
						className={cn(
							'flex h-2 w-2 rounded-full animate-pulse',
							currentStatus === WorkflowStatusEnum.VotesTallied
								? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]'
								: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
						)}
					/>
					<span
						className={cn(
							'px-3 py-1 rounded-full text-sm font-bold border transition-all duration-500 uppercase tracking-tight',
							getStatusStyles(currentStatus),
						)}
					>
						{t('workflowStatusLabels.' + currentStatus)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default WorkflowStatus;

