'use client';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const TableLogs = ({
	description,
	header,
	data,
}: {
	description: string;
	header: string[];
	data: string[][];
}) => {
	return (
		<Table>
			<TableCaption>{description}</TableCaption>
			<TableHeader>
				<TableRow>
					{header.map((header, index) => (
						<TableHead key={index}>{header}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((row, index) => (
					<TableRow key={index}>
						{row.map((cell, index) => (
							<TableCell key={index}>{cell}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default TableLogs;
