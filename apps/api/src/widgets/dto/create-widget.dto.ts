import { IsNotEmpty, IsString, IsEnum, IsObject, IsOptional, IsBoolean, IsArray, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { 
  WidgetType, 
  WidgetPosition, 
  WidgetSource, 
  CreateWidgetRequest,
  WidgetSettings 
} from '@repo/api-types';

class WidgetSettingsDto implements WidgetSettings {
  @IsEnum(WidgetPosition)
  position: WidgetPosition;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(WidgetSource, { each: true })
  sources: WidgetSource[];

  @IsOptional()
  @IsBoolean()
  showReviewUsButton?: boolean;

  @IsOptional()
  @IsBoolean()
  showReadReviewsLink?: boolean;
}

export class CreateWidgetDto implements CreateWidgetRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  property_id: string;

  @IsEnum(WidgetType)
  type: WidgetType;

  @IsObject()
  @Type(() => WidgetSettingsDto)
  settings: WidgetSettingsDto;

  @IsOptional()
  @IsBoolean()
  active?: boolean = true;
}