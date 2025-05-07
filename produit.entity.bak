import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Magasin } from './Magasin.entity';
@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  idProduit: number;
  @Column()
  magasinIdMagasin: number;

  @Column()
  titre: string;

  @Column('text')
  description: string;

  @Column('float')
  prix: number;

  @Column()
  imagePrincipale: string;

  @Column()
  dateAjout: Date;

  @ManyToOne(() => Magasin, (magasin) => magasin.produits)
  @JoinColumn({ name: 'magasinIdMagasin' })
  magasin: Magasin;
}
