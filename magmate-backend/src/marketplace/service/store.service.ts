import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Magasin } from '../entities/magasin.entity';
import { CreateMagasinDto } from '../dto/create-magasin.dto/create-magasin.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Magasin)
    private magasinRepository: Repository<Magasin>, // Injection correcte du repository
  ) { }

  // Créer un magasin
  async create(dto: CreateMagasinDto) {
    const magasin = this.magasinRepository.create(dto);
    /*const magasin = new Magasin();
    magasin.nom = dto.nom;
    magasin.description = ''
    magasin.image = dto.image;
    magasin.dateCreation = dto.dateCréation; // Ensure dateCreation is set correctly
    magasin.localisation = dto.localisation;
    magasin.horaire = dto.horaire;
    magasin.telephone = dto.telephone;
    magasin.ville = dto.ville;*/
    return this.magasinRepository.save(magasin);
  }

  // Récupérer tous les magasins
  async findAll() {
    return this.magasinRepository.find();
  }

  // Trouver un magasin par son ID
  async findOne(id: number) {
    const magasin = await this.magasinRepository.findOne({ where: { idMagasin: id } });
    if (!magasin) {
      throw new NotFoundException(`Magasin avec l'ID ${id} non trouvé`);
    }
    return magasin;
  }

  // Supprimer un magasin par son ID
  async remove(id: number) {
    const magasin = await this.magasinRepository.findOne({ where: { idMagasin: id } });
    if (!magasin) {
      throw new NotFoundException(`Magasin avec l'ID ${id} non trouvé`);
    }
    await this.magasinRepository.delete(id);
    return { message: 'Magasin supprimé avec succès' };
  }
}
