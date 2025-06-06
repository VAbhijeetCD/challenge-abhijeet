import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import {
	SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import columns from './columns';
import { Widget } from '../WidgetsTable';

type Props = {
	data: Widget[];
	isLoading?: boolean;
	totalRows: number;
};

const Table = ({ data, totalRows, isLoading }: Props) => {
	const router = useRouter();

	const d = useMemo(() => data, [data]);

	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data: d,
		state: { sorting },
		columns: columns(router),
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className="overflow-auto scrollbar-thin scrollbar-thumb-fillc scrollbar-fillc scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
			<table className=" w-full border-separate border-spacing-0 border border-borderc rounded-lg overflow-hidden">
				<thead className="bg-fillc">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									onClick={header.column.getToggleSortingHandler()}
									onKeyDown={() => {}}
									key={header.id}
									className={twMerge(
										'text-center text-sm uppercase font-bold text-textc py-1.5 px-3  md:py-3 md:px-5 border-r border-b border-borderc last:border-r-0',
										header.column.getCanSort()
											? 'cursor-pointer select-none'
											: '',
									)}
								>
									<div
										className={`flex gap-2 ${
											header.index === 0 ? 'justify-start' : 'justify-center'
										}`}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
											  )}

										{{
											asc: <ArrowUpIcon className="w-4 h-4 text-textc-gray" />,
											desc: (
												<ArrowDownIcon className="w-4 h-4 text-textc-gray" />
											),
										}[header.column.getIsSorted() as string] ?? null}
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{isLoading && (
                        <>
                            loading...
                        </>
					)}

					{!isLoading &&
						table.getRowModel().rows.map((row, i) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell, j) => (
									<td
										key={cell.id}
										className={twMerge(
											'border-t border-r border-borderc last:border-r-0',
											i === 0 ? 'border-t-0' : '',
										)}
									>
										<div
											className={`flex p-2 ${
												j <= 1 ? 'justify-start' : 'justify-center'
											}`}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</div>
									</td>
								))}
							</tr>
						))}

					{!isLoading && totalRows > 0 && data.length === 0 && (
						<tr>
							<td
								colSpan={table?.getHeaderGroups()[0]?.headers.length}
								className="text-center py-4"
							>
								No Search Results
							</td>
						</tr>
					)}

					{!isLoading && totalRows === 0 && (
						<tr>
							<td
								colSpan={table?.getHeaderGroups()[0]?.headers.length}
								className="text-center py-4 text-textc-gray italic"
							>
								No Widget Created
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
