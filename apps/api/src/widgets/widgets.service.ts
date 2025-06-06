import { mockWidgets, type Widget, WidgetSettings } from '@repo/mock-data';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';

@Injectable()
export class WidgetsService {
    // Mocking DB data for now
    private widgets: Widget[] = [...mockWidgets];

    private properties = [
        {
          id: "910684c3-2614-417b-a84c-70a0b25937a7",
          name: "Grand Hotel",
          image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
        },
        {
          id: "cf3e2e18-5d5f-43a3-93f6-c9a601f7b896",
          name: "Seaside Resort",
          image:
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3",
        },
        {
          id: "da015ec7-ac5b-4629-872f-c50ff47ff25d",
          name: "Centaurus Mall",
          image:
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3",
        },
        {
          id: "0f831285-9727-44df-8258-4766fdf3dc68",
          name: "The Plasa",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3"
        }
    ];
    
    async findAll(group_id: string) {


        /**
         * 
         * If we DB and cursors(Pagination)
         * We can implement it this way
         * 
         * const { active, type, limit = 50, offset = 0 } = req.query
         *  const where = {}
         * 
         * if (active !== undefined) where.active = active === 'true'
         * if (type) where.type = type
         * 
         * const widgets = await prisma.widgets.findMany({
         *  where,
         *  take: parseInt(limit),
         *  skip: parseInt(offset),
         *      orderBy: { created: 'desc' }
         * })
         */

        return this.widgets.filter(widget => widget.group_id === group_id).map(widget => ({
          ...widget,
          // Assuming we join the properties table, else we can use the property_id to get it using another query
          properties: {
            id: widget.property_id,
            name: `Property for ${widget.name}`,
            picture: this.properties.find(p => p.id === widget.property_id)?.image ?? 'https://example.com/property-image.jpg'
          }
        }));
    }

    async findOne(id: string, group_id: string) {

        /**
         * if we use prisma
         * const widget = await prisma.widgets.findUnique({
         *  where: { id }
         * })
         */

        const widget = this.widgets.find(w => w.id === id && w.group_id === group_id);
        if (!widget) {
            throw new NotFoundException(`Widget with ID ${id} not found`);
        }
        return {
            ...widget,
            properties: {
                id: widget.property_id,
                name: `Property for ${widget.name}`,
                picture: 'https://example.com/property-image.jpg'
            }
        };
    }

    async create(createWidgetDto: CreateWidgetDto, group_id: string) {

        /**
         * const widget = await prisma.widgets.create({
         * data: {
         * name,
         * group_id,
         * property_id,
         * type: type || 'floating', // Default to floating
         * settings: settings || {}, // Default to empty object
         * active: active !== undefined ? active : true // Default to true
         * }
         * })
         */

        const newWidget: Widget = {
            id: this.generateId(),
            name: createWidgetDto.name,
            property_id: createWidgetDto.property_id,
            type: createWidgetDto.type,
            group_id: group_id,
            settings: createWidgetDto.settings,
            active: createWidgetDto.active ?? true,
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        };
        
        this.widgets.push(newWidget);
        return {
            ...newWidget,
            properties: {
                id: newWidget.property_id,
                name: `Property for ${newWidget.name}`,
                picture: 'https://example.com/property-image.jpg'
            }
        };
    }

    async update(id: string, updateWidgetDto: UpdateWidgetDto, group_id: string) {
        const widgetIndex = this.widgets.findIndex(w => w.id === id && w.group_id === group_id);
        if (widgetIndex === -1) {
            throw new NotFoundException(`Widget with ID ${id} not found`);
        }

        const updatedWidget = {
            ...this.widgets[widgetIndex],
            ...updateWidgetDto,
            updated: new Date().toISOString()
        };

        this.widgets[widgetIndex] = updatedWidget;
        return {
            ...updatedWidget,
            properties: {
                id: updatedWidget.property_id,
                name: `Property for ${updatedWidget.name}`,
                picture: 'https://example.com/property-image.jpg'
            }
        };
    }

    async remove(id: string, group_id: string) {
        const widgetIndex = this.widgets.findIndex(w => w.id === id && w.group_id === group_id);
        if (widgetIndex === -1) {
            throw new NotFoundException(`Widget with ID ${id} not found`);
        }

        const removedWidget = this.widgets.splice(widgetIndex, 1)[0];
        return removedWidget;
    }

    private generateId(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
