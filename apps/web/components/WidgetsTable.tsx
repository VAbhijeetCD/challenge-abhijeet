import { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";
import Table from "./Table";

const WidgetsTable = () => {
	const [search, setSearch] = useState("");
	const [data, setData] = useState([]);
	const [isValidating, setIsValidating] = useState(false);

	const fetchWidgets = async () => {
		try {
			setIsValidating(true);
			const response = await fetch(`${API_URL}/widgets`);
			const data = await response.json();
			setData(data);
		} catch (error) {
			console.error("Error fetching widgets:", error);
		} finally {
			setIsValidating(false);
		}
	};

	useEffect(() => {
		fetchWidgets();
	}, []);

	return (
		<div className="border border-borderc rounded-lg p-4 bg-white">
			<div className="flex md:flex-row justify-between md:items-center flex-col items-start gap-2 mb-3">
				<div className="flex gap-2">
					<h2 className="text-base font-bold">My Widgets</h2>
				</div>

				<div className="w-full md:w-auto">
					<input
						type="search"
						placeholder={"Search your widgets"}
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						className="w-full md:w-96 border border-borderc rounded-lg p-2"
					/>
				</div>
			</div>

			<Table
				isLoading={isValidating}
				totalRows={data?.length ?? 0}
				data={data}
			/>
		</div>
	);
};

export default WidgetsTable;
