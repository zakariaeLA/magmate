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
    private readonly repo: Repository<Prestataire>,
  ) {}

  async create(dto: CreatePrestataireDto, userId: string) {
    const prestataire = this.repo.create({
      ...dto,
      utilisateur: { id: userId } as User, // on référence User par id (UUID)
    });
    return this.repo.save(prestataire);
  }

  async findByUserId(userId: string) {
    return this.repo.findOne({
      where: { utilisateur: { id: userId } },
      // where: { idUtilisateur: userId },
      relations: ['utilisateur'],
    });
  }

  async update(userId: string, dto: UpdatePrestataireDto) {
    const existing = await this.findByUserId(userId);
    console.log('🟨 Prestataire existant:', existing);
  console.log('🟦 Données reçues pour update:', dto);
    if (!existing) throw new NotFoundException('Prestataire introuvable');
    Object.assign(existing, dto);
    return this.repo.save(existing);
  }

  async deleteByUserId(userId: string) {
    const existing = await this.findByUserId(userId);
    if (!existing) throw new NotFoundException('Prestataire introuvable');
    return this.repo.remove(existing);
  }
}
