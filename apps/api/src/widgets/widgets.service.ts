import { mockWidgets, type Widget, WidgetSettings } from '@repo/mock-data';
import { Injectable } from '@nestjs/common';


@Injectable()
export class WidgetsService {
    private widgets: Widget[] = [...mockWidgets];
    
    async findAll(group_id: string) {
        return this.widgets.filter(widget => widget.group_id === group_id).map(widget => ({
          ...widget,
          properties: {
            id: widget.property_id,
            name: `Property for ${widget.name}`,
            picture: 'https://example.com/property-image.jpg'
          }
        }));
      }
}
