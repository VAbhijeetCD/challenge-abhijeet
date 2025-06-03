import mockWidgetsData from './mock-widgets-data.json';
import { Widget, WidgetSettings } from './types';

// Re-export the types
export type { Widget, WidgetSettings };

// Export the mock data with type safety
export const mockWidgets: Widget[] = mockWidgetsData as Widget[];

// Export default for convenience
export default mockWidgets;
