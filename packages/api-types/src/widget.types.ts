// Base Widget Types
export enum WidgetType {
  FLOATING = 'floating',
  STATIC = 'static'
}

export enum WidgetPosition {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right'
}

export enum WidgetSource {
  GOOGLE_MAPS = 'google_maps',
  BOOKING_COM = 'booking_com',
  TRIPADVISOR_COM = 'tripadvisor_com'
}

export interface WidgetSettings {
  position: WidgetPosition;
  sources: WidgetSource[];
  showReviewUsButton?: boolean;
  showReadReviewsLink?: boolean;
}

export interface Widget {
  id: string;
  name: string;
  property_id: string;
  type: WidgetType;
  group_id: string;
  settings: WidgetSettings;
  active: boolean;
  created: string;
  updated: string;
}

export interface WidgetWithProperties extends Widget {
  properties: {
    id: string;
    name: string;
    picture: string;
  };
}

// API Request/Response Types
export interface CreateWidgetRequest {
  name: string;
  property_id: string;
  type: WidgetType;
  settings: WidgetSettings;
  active?: boolean;
}

export interface UpdateWidgetRequest {
  name?: string;
  property_id?: string;
  type?: WidgetType;
  settings?: Partial<WidgetSettings>;
  active?: boolean;
}

export interface WidgetResponse extends WidgetWithProperties {}

export interface WidgetListResponse extends Array<WidgetWithProperties> {}

// API Error Types
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface ValidationError extends ApiError {
  statusCode: 400;
  message: string;
  error: 'Bad Request';
  details?: Array<{
    field: string;
    message: string;
  }>;
}