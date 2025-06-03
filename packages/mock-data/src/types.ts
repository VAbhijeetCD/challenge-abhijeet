export interface WidgetSettings {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  sources: ('google_maps' | 'booking_com' | 'tripadvisor_com')[];
  showReviewUsButton?: boolean;
  showReadReviewsLink?: boolean;
}

export interface Widget {
  id: string;
  name: string;
  property_id: string;
  type: 'floating' | 'static';
  group_id: string;
  settings: WidgetSettings;
  active: boolean;
  created: string;
  updated: string;
}
