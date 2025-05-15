import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards,Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { Event } from './entities/event.entity';
import { User } from '../user/entities/user.entity'; // Import de l'entité User
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard'; // Garde d'authentification
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Favorite } from './entities/favorite.entity'; // Import de l'entité Favorite


@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(@Query() filters: { city?: string; type?: string }): Promise<Event[]> {
    return this.eventsService.findAll(filters);
  }
  
  @Get('my-events')
  @UseGuards(FirebaseAuthGuard)
  async findMyEvents(@GetUser() user: User): Promise<Event[]> {
    return this.eventsService.findMyEvents(user.email);
  }
  
  @Post()
  @UseGuards(FirebaseAuthGuard)
  async create(
    @Body() createEventDto: CreateEventDto,
    @GetUser() user: User,
  ): Promise<Event> {
    return this.eventsService.create(createEventDto, user.email);
  }

  @Get('my-favorites')
  @UseGuards(FirebaseAuthGuard)
  async getFavorites(@GetUser() user: User): Promise<Event[]> {
    return this.eventsService.getFavorites(user.email);
  }

  @Delete(':id/favorite')
  @UseGuards(FirebaseAuthGuard)
  async removeFromFavorites(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.eventsService.removeFromFavorites(id, user.email);
  }

  @Post(':id/favorite')
  @UseGuards(FirebaseAuthGuard)
  async addToFavorites(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Favorite> {
    return this.eventsService.addToFavorites(id, user.email);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  async deleteEvent(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.eventsService.deleteEvent(id, user.email);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(FirebaseAuthGuard)
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @GetUser() user: User,
  ): Promise<Event> {
    return this.eventsService.updateEvent(id, updateEventDto, user.email);
  }
}