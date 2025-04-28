import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Magasin } from './Magasin.entity';

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
}
