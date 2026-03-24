import React from 'react';
import { VoterRegisteredLogInterface } from '../../../data/interfaces/events.interface';
import TableLogs from './logs/table';

const VoterRegisteredLogs = ({
	events,
}: {
	events: VoterRegisteredLogInterface[];
}) => {
	return (
		<TableLogs
			description='Voter Registered Logs'
			header={['Voter Address', 'Block Number', 'Block Timestamp']}
			data={events.map((event) => [
				event.voterAddress,
				event.blockNumber?.toString() || 'N/A',
				event.blockTimestamp?.toString() || 'N/A',
			])}
		/>
	);
};

export default VoterRegisteredLogs;
