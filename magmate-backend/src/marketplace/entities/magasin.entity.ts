import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Produit } from './produit.entity'; // Assurez-vous que Produit est bien importé
import { Utilisateur } from './utilisateur.entity'; // chemin de magasin

@Entity()
export class Magasin {
  @PrimaryGeneratedColumn()
  idMagasin: number;

  @Column()
  nom: string;

  @Column('text')
  description: string;

  @Column()
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreation: Date;

  @Column()
  localisation: string;

  @Column()
  horaire: string;

  @Column()
  telephone: string;

  @Column()
  ville: string;

  // Ajoutez la colonne estApprove avec une valeur par défaut de false
  @Column({ type: 'boolean', default: false })
  estApprove: boolean;

  // Relation OneToMany correctement définie
  @OneToMany(() => Produit, (produit) => produit.magasin)
  produits: Produit[];

  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.magasins)
  proprietaire: Utilisateur;
}
