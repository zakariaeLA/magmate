import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Produit } from './produit.entity';

@Entity()
export class ImageProd {
  @PrimaryGeneratedColumn()
  idImage: number;

  @Column()
  imageURL: string;

  @ManyToOne(() => Produit, produit => produit.images)
  produit: Produit;
}