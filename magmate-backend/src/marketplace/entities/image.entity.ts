import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Produit } from './produit.entity'; // Association à l'entité Produit

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  idImage: number;

  @Column()
  imageURL: string;  // Le nom du fichier de l'image supplémentaire

  @ManyToOne(() => Produit, (produit) => produit.images)
  produit: Produit;  // Lier l'image au produit
}
