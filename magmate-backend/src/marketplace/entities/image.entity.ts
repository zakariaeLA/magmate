import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Produit } from './produit.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  idImage: number;

  @Column()
  imageURL: string;

  @ManyToOne(() => Produit, (produit) => produit.images, {
    onDelete: 'CASCADE',
    nullable: false, // 👈 IMPORTANT : empêche NULL dans la base
  })
  produit: Produit;
}
