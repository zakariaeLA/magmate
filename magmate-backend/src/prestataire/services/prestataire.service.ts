import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestataire } from '../entities/prestataire.entity';
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
}
