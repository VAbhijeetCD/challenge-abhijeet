import {
    Body,
    Controller,
    Get, Param, Post,
    Put, UsePipes,
    ValidationPipe
} from '@nestjs/common';

import { WidgetsService } from './widgets.service';

@Controller('widgets')
export class WidgetsController {
	private readonly groupId = '123-456-789';

	constructor(private readonly widgetsService: WidgetsService) {}

    @Get()
	findAll() {
		return this.widgetsService.findAll(this.groupId);
	}


	@Post()
	create(@Body() body: {
		name: string;
		property_id: string;
		type: 'floating' | 'static';
		settings: {
			position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
			sources: ('google_maps' | 'booking_com' | 'tripadvisor_com')[];
			showReviewUsButton?: boolean;
			showReadReviewsLink?: boolean;
		};
	}) {
		// ...
	}


	@Put(':id')
	update(
		@Param('id') id: string,
		@Body() body: {
			name?: string;
			property_id?: string;
			type?: 'floating' | 'static';
			active?: boolean;
			settings: {
				position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
				sources?: ('google_maps' | 'booking_com' | 'tripadvisor_com')[];
				showReviewUsButton?: boolean;
				showReadReviewsLink?: boolean;
			};
		},
	) {
		// ...
	}


    @Get('/:id')
	getDataForWidget(@Param('id') widgetId: string) {
        // ...
	}
}
