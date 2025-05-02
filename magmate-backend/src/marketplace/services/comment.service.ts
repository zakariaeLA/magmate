// src/marketplace/services/comment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avis } from '../entities/avis.entity';
import { CreateAvisDto } from '../dto/create-avis.dto';
import { Produit } from '../entities/produit.entity';
import { Utilisateur } from '../entities/utilisateur.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
    @InjectRepository(Avis)
    private readonly avisRepository: Repository<Avis>,
  ) {}

  async getCommentsByProductId(productId: number): Promise<Avis[]> {
    return this.avisRepository.find({
      where: { produit: { idProduit: productId } },
      relations: ['auteur'], // Charger l'entité 'auteur' (Utilisateur)
      select: {
        auteur: {
          nom: true, // Charger uniquement 'nom'
          prenom: true, // Charger uniquement 'prenom'
        },
      },
      order: { date: 'DESC' }, // Trier les avis par date décroissante
    });
  }

  async createComment(productId: number, dto: CreateAvisDto): Promise<Avis> {
    // Récupérer l'utilisateur par ID en utilisant un objet de recherche
    const utilisateur = await this.utilisateurRepository.findOne({
      where: { idUtilisateur: dto.idUtilisateur }, // Utiliser l'ID pour la recherche
    });

    if (!utilisateur) {
      throw new Error('Utilisateur non trouvé');
    }

    // Créer un nouvel avis
    const avis = this.avisRepository.create({
      note: dto.note,
      commentaire: dto.commentaire,
      date: new Date(),
      produit: { idProduit: dto.idProduit },
      auteur: utilisateur, // Lier l'utilisateur au commentaire
    });

    // Sauvegarder et retourner l'avis
    return this.avisRepository.save(avis);
  }
}
