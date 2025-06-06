import { useEffect, useState, useMemo } from "react";
import Table from "./Table";
import { WidgetWithProperties } from "@repo/api-types";
import { widgetApi } from "../lib/api-client";
import { showModal } from "./Table/helpers";
import { useRouter } from "next/router";

export type Widget = WidgetWithProperties;

const WidgetsTable = () => {
	const [search, setSearch] = useState("");
	const [data, setData] = useState<Widget[]>([]);
	const [isValidating, setIsValidating] = useState(false);

	const router = useRouter();

	const fetchWidgets = async () => {
		try {
			setIsValidating(true);
			const widgets = await widgetApi.getAll();
			setData(widgets);
		} catch (error) {
			console.error("Error fetching widgets:", error);
			setData([]);
		} finally {
			setIsValidating(false);
		}
	};

	const filteredData = useMemo(() => {
		if (!search.trim()) return data;
		return data.filter(widget =>
			widget.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [data, search]);

	useEffect(() => {
		fetchWidgets();
	}, []);

	return (
		<div className="flex flex-col border border-borderc rounded-lg p-4 gap-4 bg-white">
			<div className="flex md:flex-row justify-between md:items-center flex-col items-start gap-2">
				<div className="flex gap-2">
					<h2 className="text-base font-bold text-textc">My Widgets</h2>
					<button
						onClick={() => showModal("settings", router)}
						className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
					>
						+ New Widget
					</button>
				</div>

				<div className="w-full md:w-auto">
					<input
						type="search"
						placeholder={"Search your widgets"}
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						className="w-full md:w-96 border border-borderc rounded-lg p-2 text-textc"
					/>
				</div>
			</div>

			<Table
				isLoading={isValidating}
				totalRows={data?.length ?? 0}
				data={filteredData}
			/>
		</div>
	);
};

export default WidgetsTable;
