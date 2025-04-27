import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany } from 'typeorm';
import { Magasin } from './magasin.entity';
import { ImageProd } from './produit-image.entity';
import { Avis } from './avis.entity';
import { Reclamation } from './reclamation.entity';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  idProduit: number;

  @Column()
  titre: string;

  @Column('text')
  description: string;

  @Column('float')
  prix: number;

  @Column()
  imagePrincipale: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateAjout: Date;

  @ManyToOne(() => Magasin, (magasin) => magasin.produits, {
    onDelete: 'CASCADE',
  })

  // Relation plusieurs à un entre Produit et Magasin
  @ManyToOne(() => Magasin, (magasin) => magasin.produits)
  magasin: Magasin;


  @OneToMany(() => ImageProd, (image) => image.produit)
  images: ImageProd[];

  @OneToMany(() => Avis, (avis) => avis.produit)
  avis: Avis[];

  // Ajout de la relation OneToMany pour les réclamations
  @OneToMany(() => Reclamation, (reclamation) => reclamation.produit)
  reclamations: Reclamation[]; // Lier un produit à plusieurs réclamations
}