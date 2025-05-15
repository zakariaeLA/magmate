import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event, EventStatus } from './entities/event.entity';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { User } from '../user/entities/user.entity';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  // 🔧 1. Créer un événement
  async create(createEventDto: CreateEventDto, userEmail: string): Promise<Event> {
    const user = await this.usersRepository.findOne({ where: { email: userEmail } });
    if (!user) throw new NotFoundException("Utilisateur non trouvé");

    const event = this.eventsRepository.create({
      ...createEventDto,
      createdBy: user,
    });

    return this.eventsRepository.save(event);
  }

  // 📌 2. Lister tous les événements approuvés avec filtres
  async findAll(filters?: { city?: string; type?: string }): Promise<Event[]> {
    const query = this.eventsRepository
      .createQueryBuilder('event')
      .where('event.status = :status', { status: EventStatus.APPROVED });

    if (filters?.city) {
      query.andWhere('event.city = :city', { city: filters.city });
    }

    if (filters?.type) {
      query.andWhere('event.type = :type', { type: filters.type });
    }

    return await query.getMany();
  }

  // 🔎 3. Voir les détails d’un événement
  async findOne(id: string): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Événement introuvable');
    return event;
  }

  // 📄 4. Voir les événements créés par un utilisateur
  async findMyEvents(userEmail: string): Promise<Event[]> {
    // Trouver l'utilisateur par son email
    console.log("Email de l'utilisateur:", userEmail);
    const user = await this.usersRepository.findOne({ where: { email: userEmail } });
    if (!user) throw new NotFoundException("Utilisateur non trouvé");
  
    // Trouver les événements créés par cet utilisateur en utilisant son ID (UUID)
    return this.eventsRepository.find({
      where: { createdBy: { id: user.id } },  // Utiliser l'ID de l'utilisateur
    });
  }

  // 🗑 5. Supprimer un événement
  async deleteEvent(id: string, userEmail: string): Promise<void> {
    const event = await this.eventsRepository.findOne({ where: { id }, relations: ['createdBy'] });
    if (!event) throw new NotFoundException('Événement introuvable');

    if (event.createdBy.email !== userEmail) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à supprimer cet événement");
    }

    await this.eventsRepository.delete(id);
  }

  // 🛠 6. Mettre à jour un événement
  async updateEvent(id: string, updateEventDto: UpdateEventDto, userEmail: string): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id }, relations: ['createdBy'] });
    if (!event) throw new NotFoundException('Événement introuvable');

    if (event.createdBy.email !== userEmail) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à modifier cet événement");
    }

    Object.assign(event, updateEventDto);
    return this.eventsRepository.save(event);
  }

  // ⭐ 7. Ajouter aux favoris
  async addToFavorites(eventId: string, userEmail: string): Promise<Favorite> {
    const event = await this.eventsRepository.findOne({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Événement introuvable');

    const user = await this.usersRepository.findOne({ where: { email: userEmail } });
    if (!user) throw new NotFoundException("Utilisateur non trouvé");
  // Vérifie si le favori existe déjà
  const existing = await this.favoritesRepository.findOne({ where: { user: { id: user.id }, event: { id: event.id } } });
  if (existing) {
    return existing; // Ou lève une erreur si tu préfères
  }
    const favorite = this.favoritesRepository.create({ user, event });
    return this.favoritesRepository.save(favorite);
  }

  // 📥 8. Lister les favoris
async getFavorites(userEmail: string): Promise<Event[]> {
  const user = await this.usersRepository.findOne({ where: { email: userEmail } });
  if (!user) throw new NotFoundException("Utilisateur non trouvé");

  const favorites = await this.favoritesRepository.find({
    where: { user: { id: user.id } },
    relations: ['event'],
  });

  console.log('user:', user);
  console.log('favorites:', favorites);

  return favorites.map(f => f.event);
}

  // ❌ 9. Supprimer un favori
  async removeFromFavorites(eventId: string, userEmail: string): Promise<void> {
    const event = await this.eventsRepository.findOne({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Événement introuvable');

    const user = await this.usersRepository.findOne({ where: { email: userEmail } });
    if (!user) throw new NotFoundException("Utilisateur non trouvé");

    const favorite = await this.favoritesRepository.findOne({ where: { user, event } });
    if (!favorite) throw new NotFoundException('Le favori n\'existe pas');

    await this.favoritesRepository.remove(favorite);
  }
}