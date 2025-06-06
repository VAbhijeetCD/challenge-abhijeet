import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { WidgetsController } from './widgets.controller';
import { WidgetsService } from './widgets.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
	imports: [
		ThrottlerModule.forRoot([{
			ttl: 60000, // 1 minute
			limit: 100, // 100 requests per minute
		}]),
	],
	controllers: [WidgetsController],
	providers: [
		{
			provide: WidgetsService,
			useClass: WidgetsService
		},
		LoggingInterceptor
	],
})
export class WidgetsModule {}
