// src/events/dto/update-event.dto.ts
import { IsString, IsOptional, IsEnum, IsDate, IsUrl } from 'class-validator';
import { EventType, EventStatus } from '../entities/event.entity';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  lieu?: string;

  @IsEnum(EventType)
  @IsOptional()
  type?: EventType;

  @IsDate()
  @IsOptional()
  date?: Date;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;
}