/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @next/next/no-img-element */
import { createColumnHelper } from '@tanstack/react-table';
import { NextRouter } from 'next/router';
import { showModal } from './helpers';
import { Widget } from '../WidgetsTable';

const columnHelper = createColumnHelper<Widget>();

export default (router: NextRouter) => [
	columnHelper.accessor('name', {
		header: () => 'Name',
		cell: ({ getValue }) => (
			<p className="text-textc text-sm font-bold max-w-32 2xl:max-w-40 overflow-hidden whitespace-nowrap text-ellipsis">
				{getValue()}
			</p>
		),
	}),
	columnHelper.accessor('properties', {
		header: () => <div className="text-center">Property</div>,
		cell: ({ getValue }) => (
			// max-w-44 2xl:max-w-72
			<div className="w-full flex gap-2 items-center overflow-hidden justify-start ">
				<img
					alt={getValue()?.name}
					src={getValue()?.picture ?? ''}
					className="w-6 h-6 rounded-full object-cover"
					onError={(e) => {
						const target = e.target as HTMLImageElement;
						if (target) {
							target.onerror = null;
							target.src =
								'https://textgen-property-images.s3.eu-central-1.amazonaws.com/placeholders/placeholder_hotel-1.jpg';
						}
					}}
				/>
				<p className="text-textc text-sm font-medium overflow-hidden whitespace-nowrap text-ellipsis">
					{getValue()?.name}
				</p>
			</div>
		),
	}),
	columnHelper.accessor('type', {
		header: () => <p>Type</p>,
		cell: ({ getValue }) => (
			<div data-type={getValue() === 'floating' ? 'primary' : 'negative'}>
				<span className="capitalize text-textc">{getValue()}</span>
			</div>
		),
	}),
	columnHelper.accessor('settings.sources', {
		cell: ({ getValue }) => (
			<div className="flex gap-2">
				{getValue().map((source) => (
					<img
						key={source}
						alt={source}
						src={`/img/logos/logo_${source}_small.png`}
						className="w-6 h-6"
					/>
				))}
			</div>
		),
		header: () => 'Sources',
	}),


	columnHelper.display({
		id: 'edit',
		cell: ({ row }) => (
			<button
				className="text-textc-gray"
				onClick={() => showModal('settings',router, row.original.id)}
			>
				Settings
			</button>
		),
	}),
	columnHelper.display({
		id: 'getCode',
		cell: ({ row }) => (
			<button
				className="text-textc-gray"
				onClick={() =>
					showModal('code',router, row.original.id, row.original.type)
				}
			>
				Get Code
			</button>
		),
	}),
	columnHelper.display({
		id: 'preview',
		cell: ({ row }) => (
			<button
				className="text-textc-gray"
				onClick={() => showModal('preview',router, row.original.id)}
			>
				Preview
			</button>
		),
	}),
	// columnHelper.display({
	// 	id: 'delete',
	// 	cell: ({ row }) => <DeleteWidget widget_id={row.original.id} />,
	// }),
];
