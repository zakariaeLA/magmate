import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestataire } from '../entities/prestataire.entity';

@Injectable()
export class PrestatairedetailsService {
  constructor(
    @InjectRepository(Prestataire)
    private readonly prestataireRepo: Repository<Prestataire>,
  ) {}

  /**
   * Récupère les détails d'un prestataire par `idPrestataire`
   * Inclut les informations de l'utilisateur lié
   */
  async findById(idPrestataire: string): Promise<Prestataire> {
    const prestataire = await this.prestataireRepo.findOne({
      where: { idPrestataire },
      relations: ['utilisateur'],
    });

    if (!prestataire) {
      throw new NotFoundException(`Prestataire avec l'ID ${idPrestataire} non trouvé`);
    }

    return prestataire;
  }
}
