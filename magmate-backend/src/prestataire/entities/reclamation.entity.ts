// src/marketplace/entities/reclamation.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Prestataire } from './prestataire.entity';  // Importer Produit
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Reclamation {
  @PrimaryGeneratedColumn()
  idReclamation: number;

  @Column('text')
  description: string;  // Description du problème

  @Column()
  dateCreation: Date;  // Date de la réclamation

  @Column()
  pieceJointe: string;  // Pièce jointe de la réclamation

  @Column()
  idCible: number;  // ID du produit concerné

  @ManyToOne(() => Prestataire, (prestataire) => prestataire.reclamations)
  prestataire: Prestataire;  // Lier la réclamation à un produit

  @ManyToOne(() => User, (utilisateur) => utilisateur.reclamations)
  utilisateur: User;  // Lier la réclamation à un utilisateur
}