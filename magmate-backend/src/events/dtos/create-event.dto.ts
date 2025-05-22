import { IsString, IsEnum, IsDate, IsOptional } from 'class-validator';
import { EventType, EventStatus } from '../entities/event.entity';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  city: string;

  @IsEnum(EventType)
  type: EventType;

  @IsDate()
  date: Date;

  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus; // Par défaut, l'événement sera 'PENDING'
}