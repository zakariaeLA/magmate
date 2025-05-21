import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Magasin } from '../entities/magasin.entity';
import { CreateMagasinDto } from '../dto/create-magasin.dto/create-magasin.dto';
import { UpdateMagasinDto } from '../dto/update-magasin.dto/update-magasin.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Magasin)
    private magasinRepository: Repository<Magasin>,
    @InjectRepository(User)
    private userRepository: Repository<User>, // Injection du repository User
  ) {}

  async checkUserExistence(proprietaireId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: proprietaireId },
    });
  }

  // Créer un magasin
  async create(dto: CreateMagasinDto) {
    // Vérifier si l'utilisateur existe
    const user = await this.userRepository.findOne({
      where: { id: dto.proprietaireId },
    });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé'); // Si l'utilisateur n'existe pas
    }

    // Initialiser le magasin avec les données du DTO
    const magasin = this.magasinRepository.create(dto);
    magasin.proprietaire = user; // Lier l'utilisateur au magasin
    magasin.dateCreation = new Date();
     console.log('DTO reçu:', dto); // Ajouter la date de création si elle n'est pas fournie

    try {
      // Sauvegarder le magasin dans la base de données
     

      return await this.magasinRepository.save(magasin);
    } catch (error) {
      console.error('Erreur lors de la création du magasin:', error);
      throw new InternalServerErrorException(
        'Erreur interne lors de la création du magasin',
      );
    }
  }

  // Récupérer tous les magasins
  async findAll() {
    try {
      return await this.magasinRepository.find(); // Retourner tous les magasins
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la récupération des magasins',
      );
    }
  }

  // Trouver un magasin par son ID
  async findOne(idMagasin: number) {
    try {
      const magasin = await this.magasinRepository.findOne({
        where: { idMagasin: idMagasin },
        relations: ['proprietaire'], // Inclure l'utilisateur propriétaire dans les résultats
      });

      if (!magasin) {
        throw new NotFoundException(
          `Magasin avec l'ID ${idMagasin} non trouvé`,
        );
      }

      return magasin;
    } catch (error) {
      throw new InternalServerErrorException(
        `Erreur lors de la récupération du magasin avec l'ID ${idMagasin}`,
      );
    }
  }

  // Mettre à jour un magasin
  async update(idMagasin: number, dto: UpdateMagasinDto) {
    const magasin = await this.magasinRepository.findOne({
      where: { idMagasin: idMagasin },
    });

    if (!magasin) {
      throw new NotFoundException(`Magasin avec l'ID ${idMagasin} non trouvé`);
    }

    // Mise à jour du magasin avec les nouvelles données
    Object.assign(magasin, dto);

    try {
      // Sauvegarder les modifications dans la base de données
      return await this.magasinRepository.save(magasin);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la mise à jour du magasin',
      );
    }
  }

  // Supprimer un magasin par son ID
  async remove(idMagasin: number) {
    const magasin = await this.magasinRepository.findOne({
      where: { idMagasin: idMagasin },
    });

    if (!magasin) {
      throw new NotFoundException(`Magasin avec l'ID ${idMagasin} non trouvé`);
    }

    try {
      // Supprimer le magasin
      await this.magasinRepository.delete(idMagasin);
      return { message: 'Magasin supprimé avec succès' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la suppression du magasin',
      );
    }
  }
}