import { Module } from '@nestjs/common';
import { WidgetsController } from './widgets.controller';
import { WidgetsService } from './widgets.service';

@Module({
	controllers: [WidgetsController],
	providers: [
		{
			provide: WidgetsService,
			useClass: WidgetsService
		}
	],
})
export class WidgetsModule {}
