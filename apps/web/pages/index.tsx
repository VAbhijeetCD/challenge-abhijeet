import { useRouter } from 'next/router';
import { useState } from 'react';
import WidgetsTable from "../components/WidgetsTable";
import WidgetFormModal from "../components/Modal/WidgetForm";

export default function Home() {
    const router = useRouter();
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const isModalOpen = router.query.showSettingsModal === 'true';
    const widgetId = router.query.widget_id as string;

    const closeModal = () => {
        const newQuery = { ...router.query };
        delete newQuery.showSettingsModal;
        delete newQuery.widget_id;
        delete newQuery.widget_type;
        
        router.replace({
            pathname: router.pathname,
            query: newQuery,
        }, undefined, { shallow: true });
    };

    const handleWidgetSave = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <>
            <div className="w-full mx-auto bg-layout-background relative flex-1 flex flex-row h-[100vh]">
				<div className="inline-block flex-1 h-fit hd:h-full w-full">
					<div className="h-fit hd:h-full w-full flex flex-col flex-grow pt-5 px-5">
						<div className="flex gap-2">
							<h1 className="flex-none text-lg font-bold mb-2 text-textc">
								Review Widgets
							</h1>
						</div>
						<WidgetsTable key={refreshTrigger} />
					</div>
				</div>
			</div>

            {/* Unified Modal for both creating and editing */}
            <WidgetFormModal
                isOpen={isModalOpen}
                onClose={closeModal}
                widgetId={widgetId} // If undefined, modal will be in create mode
                onSave={handleWidgetSave}
            />
        </>
    );
}
