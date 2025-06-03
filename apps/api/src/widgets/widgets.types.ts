export type platform = 'google_maps' | 'booking_com' | 'tripadvisor_com';

export interface WidgetSettings {
	sources: platform[];
	position: Position;
}

export enum Position {
	TopLeft = 'top-left',
	TopRight = 'top-right',
	BottomLeft = 'bottom-left',
	BottomRight = 'bottom-right',
}

export type ScrapingStatusRaw = {
	widget_id: string;
	status: string;
	platforms_scraped: number;
};
