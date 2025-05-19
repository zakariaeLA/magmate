import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Magasin } from '../entities/magasin.entity';
import { CreateMagasinDto } from '../dto/create-magasin.dto/create-magasin.dto';
import { UpdateMagasinDto } from '../dto/update-magasin.dto/update-magasin.dto';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Magasin)
    private magasinRepository: Repository<Magasin>,
    @InjectRepository(User)
    private utilisateurRepository: Repository<User>,
  ) {}

  async create(dto: CreateMagasinDto) {
    const utilisateur = await this.utilisateurRepository.findOneBy({ id: dto.proprietaireId });
    if (!utilisateur) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    

    const magasin = this.magasinRepository.create({
      ...dto,
      proprietaire: utilisateur,
    });
    magasin.dateCreation = new Date();
    return this.magasinRepository.save(magasin);
  }

  // Récupérer tous les magasins
  async findAll() {
    return this.magasinRepository.find(); // Retourner tous les magasins
  }

  // Trouver un magasin par son ID
  async findOne(id: number) {
    const magasin = await this.magasinRepository.findOne({
      where: { idMagasin: id },
    });
    if (!magasin) {
      throw new NotFoundException(`Magasin avec l'ID ${id} non trouvé`);
    }
    return magasin;
  }
  // Mettre à jour un magasin
  // Mettre à jour un magasin
  async update(id: number, dto: UpdateMagasinDto) {
    const magasin = await this.magasinRepository.findOne({
      where: { idMagasin: id },
    });
    if (!magasin) {
      throw new NotFoundException(`Magasin avec l'ID ${id} non trouvé`);
    }

    // Mettre à jour les champs avec les valeurs du DTO
    Object.assign(magasin, dto);

    // Sauvegarder les changements
    return this.magasinRepository.save(magasin);
  }

  // Supprimer un magasin par son ID
  async remove(id: number) {
    const magasin = await this.magasinRepository.findOne({
      where: { idMagasin: id },
    });
    if (!magasin) {
      throw new NotFoundException(`Magasin avec l'ID ${id} non trouvé`);
    }
    await this.magasinRepository.delete(id); // Supprimer le magasin
    return { message: 'Magasin supprimé avec succès' }; // Retourner un message de succès
  }
}
