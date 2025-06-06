import { NextRouter } from 'next/router';

const mapModalTypeToTitle = {
	code: 'showCodeModal',
	settings: 'showSettingsModal',
	preview: 'showPreviewModal',
};

/**
 * This function will update the query parameters to show the modal
 * Can be used to show the 'settings', 'code', or 'preview' modal
 * Requires the widget_id and the router object
 */
export function showModal(
	modalType: 'settings' | 'code' | 'preview',
	router: NextRouter,
	widget_id?: string,
	widget_type?: 'static' | 'floating',
) {
	const { query } = router;

	// Set the new query parameters for 'showCodeModal' and 'property_id'
	const updatedQuery = {
		...query,
		[mapModalTypeToTitle[modalType]]: 'true',
		...(widget_type && { widget_type }),
		...(widget_id && {widget_id})
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
