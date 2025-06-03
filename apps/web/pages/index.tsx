import WidgetsTable from "../components/WidgetsTable";

export default function Home() {
    return (
        <div className="w-full mx-auto bg-layout-background relative flex-1 flex flex-row h-[80vh]">
				<div className="inline-block flex-1 h-fit hd:h-full w-full">
					<div className="h-fit hd:h-full w-full flex flex-col flex-grow pt-5 px-5">
						<div className="flex gap-2">
							<h1 className="flex-none text-lg font-bold mb-2">
								Review Widgets
							</h1>
						</div>
						<WidgetsTable />
					</div>
				</div>
			</div>
    );
}
