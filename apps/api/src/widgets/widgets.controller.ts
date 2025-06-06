import {
    Body,
    Controller,
    Get, 
    Param, 
    Post,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { WidgetsService } from './widgets.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Controller('widgets')
@UseGuards(ThrottlerGuard)
@UseInterceptors(LoggingInterceptor)
export class WidgetsController {
	private readonly groupId = '123-456-789';

	constructor(private readonly widgetsService: WidgetsService) {}

    @Get()
	async findAll() {
		return this.widgetsService.findAll(this.groupId);
	}

    @Get(':id')
	async findOne(@Param('id') id: string) {
        return this.widgetsService.findOne(id, this.groupId);
	}

	@Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
	async create(@Body() createWidgetDto: CreateWidgetDto) {
		return this.widgetsService.create(createWidgetDto, this.groupId);
	}

	@Put(':id')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
	async update(
		@Param('id') id: string,
		@Body() updateWidgetDto: UpdateWidgetDto,
	) {
		return this.widgetsService.update(id, updateWidgetDto, this.groupId);
	}

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        return this.widgetsService.remove(id, this.groupId);
    }
}
