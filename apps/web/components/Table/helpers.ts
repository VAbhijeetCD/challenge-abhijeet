import { NextRouter } from 'next/router';

const mapModalTypeToTitle = {
	code: 'showCodeModal',
	settings: 'showSettingsModal',
};

/**
 * This function will update the query parameters to show the modal
 * Can be used to show the 'settings' or 'code' modal
 * Requires the widget_id and the router object
 */
export function showModal(
	modalType: 'settings' | 'code',
	widget_id: string,
	router: NextRouter,
	widget_type?: 'static' | 'floating',
) {
	const { query } = router;

	// Set the new query parameters for 'showCodeModal' and 'property_id'
	const updatedQuery = {
		...query,
		[mapModalTypeToTitle[modalType]]: 'true',
		...(widget_type && { widget_type }),
		widget_id,
	};

	router.replace(
		{
			pathname: router.pathname,
			query: updatedQuery,
		},
		undefined,
		{ shallow: true },
	);
}
