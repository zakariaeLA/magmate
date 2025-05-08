import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestataire } from '../entities/prestataire.entity';

import { CreatePrestataireDto } from '../dto/create-prestataire.dto';
import { UpdatePrestataireDto } from '../dto/update-prestataire.dto';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class PrestataireService {
  constructor(
    @InjectRepository(Prestataire)
    private readonly prestataireRepo: Repository<Prestataire>,
  ) {}
  async findFiltered(ville?: string, query?: string): Promise<Prestataire[]> {
    const qb = this.prestataireRepo
      .createQueryBuilder('prestataire')
      .leftJoinAndSelect('prestataire.utilisateur', 'utilisateur');

    if (ville && ville.trim() !== '') {
      qb.andWhere('LOWER(prestataire.ville) LIKE LOWER(:ville)', {
        ville: `%${ville}%`,
      });
    }

    if (query && query.trim() !== '') {
      qb.andWhere(
        `(LOWER(prestataire.specialite) LIKE LOWER(:query)
          OR LOWER(prestataire.ville) LIKE LOWER(:query)
          )`,
        { query: `%${query}%` },
      );
    }

    return qb.getMany();
  }
  /*async findByUtilisateurId(id: string): Promise<Prestataire | null> {
    return await this.prestataireRepo.findOne({
      where: { utilisateur: { id } },
      relations: ['utilisateur'],
    });
  }*/
  async findByUuid(uuid: string): Promise<Prestataire> {
    const prestataire = await this.prestataireRepo.findOne({
      where: {
        utilisateur: {
          id: uuid,
        },
      },
      relations: ['utilisateur'], // important pour charger la relation
    });

    if (!prestataire) {
      throw new NotFoundException(`Prestataire avec l'UUID ${uuid} non trouvé`);
    }

    return prestataire;
  }
  async updateDisponibilite(
    id: string,
    disponibilite: boolean,
  ): Promise<Prestataire> {
    const prestataire = await this.prestataireRepo.findOneBy({
      idPrestataire: id,
    });
    if (!prestataire) throw new NotFoundException('Prestataire non trouvé');

    prestataire.disponibilite = disponibilite;
    return this.prestataireRepo.save(prestataire);
  }

  async create(dto: CreatePrestataireDto, userId: string) {
    const prestataire = this.prestataireRepo.create({
      ...dto,
      utilisateur: { id: userId } as User, // on référence User par id (UUID)
    });
    return this.prestataireRepo.save(prestataire);
  }

  async findByUserId(userId: string) {
    return this.prestataireRepo.findOne({
      where: { utilisateur: { id: userId } },

      // where: { idUtilisateur: userId },
      relations: ['utilisateur'],
    });
  }

  /*async update(userId: string, dto: UpdatePrestataireDto) {
    const existing = await this.findByUserId(userId);
    console.log('🟨 Prestataire existant:', existing);
    console.log('🟦 Données reçues pour update:', dto);
    if (!existing) throw new NotFoundException('Prestataire introuvable');
    Object.assign(existing, dto);
    return this.prestataireRepo.save(existing);
  }*/
  async update(idPrestataire: string, dto: UpdatePrestataireDto) {
    const existing = await this.prestataireRepo.findOne({
      where: { idPrestataire: idPrestataire },
    });
    if (!existing) throw new NotFoundException('Prestataire introuvable');
    Object.assign(existing, dto);
    return this.prestataireRepo.save(existing);
  }

  /*async deleteByUserId(userId: string) {
    const existing = await this.findByUserId(userId);
    if (!existing) throw new NotFoundException('Prestataire introuvable');
    return this.prestataireRepo.remove(existing);

  }*/
  async deletePrestataire(idPrestataire: string): Promise<void> {
    const prestataire = await this.prestataireRepo.findOne({
      where: { idPrestataire: idPrestataire },
    });

    if (!prestataire) {
      throw new NotFoundException('Prestataire non trouvé');
    }

    await this.prestataireRepo.remove(prestataire); // Supprime le prestataire
  }
}
