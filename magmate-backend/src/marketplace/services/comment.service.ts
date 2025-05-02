// src/marketplace/services/comment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avis } from '../entities/avis.entity';
import { CreateAvisDto } from '../dto/create-avis.dto';
import { Produit } from '../entities/produit.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(

    @InjectRepository(User)
    private readonly utilisateurRepository: Repository<User>,

    @InjectRepository(Avis)
    private readonly avisRepository: Repository<Avis>,
  ) {}

  async getCommentsByProductId(productId: number): Promise<Avis[]> {

  return this.avisRepository.find({
    where: { produit: { idProduit: productId } },
    relations: ['auteur'],  
    select: {
      auteur: {
        fname: true,   
        lname: true, 
      },
    },
    order: { date: 'DESC' },  
  });
}

  

async createComment(productId: number, dto: CreateAvisDto, user: { email: string }): Promise<Avis> {
  const avis = this.avisRepository.create({
    note: dto.note,
    commentaire: dto.commentaire,
    date: new Date(),
    produit: { idProduit: productId }, 
    auteur: { email: user.email }, 
  });
  return this.avisRepository.save(avis);
}


} 

