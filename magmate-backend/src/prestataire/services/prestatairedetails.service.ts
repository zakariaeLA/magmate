import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestataire } from '../entities/prestataire.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class PrestatairedetailsService {
  constructor(
    @InjectRepository(Prestataire)
    private readonly prestataireRepo: Repository<Prestataire>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * Récupérer le prestataire par UUID utilisateur
   */
  async findByUuid(uuid: string): Promise<Prestataire> {
    const prestataire = await this.prestataireRepo.findOne({
      where: { idUtilisateur: uuid },
      relations: ['utilisateur'],
    });

    if (!prestataire) {
      throw new NotFoundException(`Prestataire avec l'UUID ${uuid} non trouvé`);
    }

    return prestataire;
  }

  /**
   * Récupérer le prestataire par email utilisateur
   */
  async findByEmail(email: string): Promise<Prestataire> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'email ${email} non trouvé`);
    }

    const prestataire = await this.prestataireRepo.findOne({
      where: { idUtilisateur: user.id },
      relations: ['utilisateur'],
    });

    if (!prestataire) {
      throw new NotFoundException(`Prestataire avec l'email ${email} non trouvé`);
    }

    return prestataire;
  }
}
