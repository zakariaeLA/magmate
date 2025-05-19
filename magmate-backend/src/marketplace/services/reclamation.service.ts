// src/marketplace/services/reclamation.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reclamation } from '../entities/reclamation.entity';
import { CreateReclamationDto } from '../dto/create-reclamation.dto';
import { Produit } from '../entities/produit.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class ReclamationService {
  constructor(
    @InjectRepository(Reclamation)
    private readonly reclamationRepository: Repository<Reclamation>,
    @InjectRepository(Produit)
    private readonly produitRepository: Repository<Produit>,
    @InjectRepository(User)
    private readonly utilisateurRepository: Repository<User>
  ) {}

  // Créer une réclamation
  async createReclamation(dto: CreateReclamationDto): Promise<Reclamation> {
    const produit = await this.produitRepository.findOne({ where: { idProduit: dto.idCible } });
    if (!produit) {
      throw new Error('Produit non trouvé');
    }

    const utilisateur = await this.utilisateurRepository.findOneBy({ id: dto.idUtilisateur });

    if (!utilisateur) {
      throw new Error('Utilisateur non trouvé');
    }

    const reclamation = this.reclamationRepository.create({
      description: dto.description,
      dateCreation: new Date(),
      pieceJointe: dto.pieceJointe,
      idCible: dto.idCible,  // Assigner idCible à partir du DTO
      produit: produit,
      utilisateur: utilisateur,
    });

    return this.reclamationRepository.save(reclamation);
  }

  // Récupérer les réclamations d'un produit
  async getReclamationsByProductId(productId: number): Promise<Reclamation[]> {
    return this.reclamationRepository.find({
      where: { produit: { idProduit: productId } },
      relations: ['utilisateur', 'produit'],  // Charger les relations utilisateur et produit
      order: { dateCreation: 'DESC' },
    });
  }
}
