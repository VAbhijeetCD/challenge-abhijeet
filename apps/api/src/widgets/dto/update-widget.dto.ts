import { PartialType } from '@nestjs/mapped-types';
import { CreateWidgetDto } from './create-widget.dto';
import { UpdateWidgetRequest } from '@repo/api-types';

export class UpdateWidgetDto extends PartialType(CreateWidgetDto) implements UpdateWidgetRequest {}