import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository ,} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produit } from '../entities/produit.entity';
import { CreateProduitDto } from '../dto/create-produit.dto/create-produit.dto';
import { UpdateProduitDto } from '../dto/update-produit.dto/update-produit.dto';
import { Magasin } from '../entities/magasin.entity';
import { Image } from '../entities/image.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
    private produitRepository: Repository<Produit>,

    @InjectRepository(Magasin)
    private magasinRepository: Repository<Magasin>,

    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) { }

  async create(dto: CreateProduitDto) {
    const produit = new Produit();
    produit.titre = dto.titre;
    produit.description = dto.description;
    produit.prix = dto.prix;
    produit.imagePrincipale = dto.imagePrincipale;
    produit.dateAjout = new Date();

    console.log(`magasin id : ${dto.magasinIdMagasin}`);

    if (dto.magasinIdMagasin) {
      const magasin = await this.magasinRepository.findOneBy({ idMagasin: dto.magasinIdMagasin });

      if (!magasin) {
        throw new Error('Magasin introuvable');
      }

      console.log(`Found magasin: ${magasin.nom}`);
      produit.magasin = magasin;
    }

    const savedProduit = await this.produitRepository.save(produit);

    if (dto.images && dto.images.length > 0) {
      const images = dto.images.map((imageURL) => {
        const image = new Image();
        image.imageURL = imageURL;
        image.produit = savedProduit;
        return image;
      });

      await this.imageRepository.save(images);
    } else {
      console.log("No images provided or image array is empty");
    }

    return savedProduit;
  }

  findAll() {
    return this.produitRepository.find({ relations: ['magasin'] });
  }

  findOne(id: number) {
    return this.produitRepository.findOne({ where: { idProduit: id }, relations: ['magasin', 'images'] });
  }

  async update(id: number, dto: UpdateProduitDto) {
    console.log('Données reçues pour mise à jour:', dto);
    
    // Récupérer le produit à partir de la base de données
    const produit = await this.produitRepository.findOne({
      where: { idProduit: id },
      relations: ['images', 'magasin'],
    });
  
    if (!produit) {
      throw new NotFoundException('Produit introuvable');
    }
  
    // Mise à jour des champs, seulement si les champs sont définis
    if (dto.titre) produit.titre = dto.titre;
    if (dto.description) produit.description = dto.description;
    if (dto.prix) produit.prix = dto.prix;
  
    // Mise à jour de l'image principale si elle est définie
    if (dto.imagePrincipale) produit.imagePrincipale = dto.imagePrincipale;
    
    // Mise à jour des images supplémentaires
    if (dto.images && dto.images.length > 0) {
      const validImages = dto.images.filter(image => image && image.trim() !== "");
  
      // Supprimer les anciennes images associées au produit
      if (validImages.length > 0) {
        await this.imageRepository.delete({ produit: produit });
  
        // Ajouter les nouvelles images
        const images = validImages.map((imageURL) => {
          const image = new Image();
          image.imageURL = imageURL;
          image.produit = produit;
          return image;
        });
  
        // Sauvegarder les nouvelles images
        await this.imageRepository.save(images);
      }
    }
  
    // Sauvegarder le produit mis à jour avec les informations actualisées
    return this.produitRepository.save(produit);
  }
  
  


  // Modification de la méthode remove
  async remove(id: number) {
    const produit = await this.produitRepository.findOne({
      where: { idProduit: id },
      relations: ['images'],  // Charger les images associées au produit
    });

    if (!produit) {
      throw new Error('Produit introuvable');
    }

    // Supprimer les images associées au produit
    if (produit.images && produit.images.length > 0) {
      await this.imageRepository.delete({ produit: produit });  // Supprimer les images liées
    }

    // Supprimer le produit
    await this.produitRepository.remove(produit);  // Supprimer le produit de la base de données

    return { message: 'Produit supprimé avec succès' };
  }
}
