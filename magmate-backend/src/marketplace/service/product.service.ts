import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository ,} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produit } from '../entities/produit.entity';
import { CreateProduitDto } from '../dto/create-produit.dto/create-produit.dto';
import { UpdateProduitDto } from '../dto/update-produit.dto/update-produit.dto';
import { Magasin } from '../entities/magasin.entity';
import { Image } from '../entities/image.entity';
import { writeFileSync } from 'fs';
import { join } from 'path';

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

  async create(dto: CreateProduitDto): Promise<Produit> {
    const produit = new Produit();
    produit.titre = dto.titre;
    produit.description = dto.description;
    produit.prix = dto.prix;
    produit.imagePrincipale = dto.imagePrincipale;
    produit.dateAjout = new Date();

    // Fetch Magasin if magasinIdMagasin exists
    const magasin = await this.magasinRepository.findOneBy({idMagasin:dto.magasinIdMagasin});
    if (!magasin) {
      throw new Error('Magasin introuvable');
    }
    produit.magasin = magasin;

    // Save the main image (Base64 -> file)
    const mainImageBuffer = this.convertBase64ToBuffer(dto.imagePrincipale);
    const mainImagePath = this.saveImage(mainImageBuffer, 'imagePrincipale');  // Save image and get the path
    produit.imagePrincipale = mainImagePath;  // Save image path or URL

    // Handle additional images
    const images = dto.images?.map((base64Image, index) => {
      const image = new Image();
      const imageBuffer = this.convertBase64ToBuffer(base64Image);
      const imagePath = this.saveImage(imageBuffer, `image-${index}`);  // Save each image and get the path
      image.imageURL = imagePath;  // Store the path or URL of the image
      image.produit = produit;
      return image;
    });

    // Save product
    const savedProduit = await this.produitRepository.save(produit);

    // Save images associated with the product
    if (images && images.length > 0) {
      await this.imageRepository.save(images);
    }

    return savedProduit;
  }

  private convertBase64ToBuffer(base64String: string): Buffer {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');  // Remove base64 header
    return Buffer.from(base64Data, 'base64');  // Convert to Buffer
  }

  private saveImage(imageBuffer: Buffer, filename: string): string {
    const imagePath = join(__dirname, '..', 'uploads', `${filename}.jpg`);  // Save the file with a name
    writeFileSync(imagePath, imageBuffer);  // Save the buffer to a file
    return imagePath;  // Return the path or URL to the saved image
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
  
    // Mise à jour des images si elles sont définies
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
  
    // Mise à jour du magasin si un nouvel ID de magasin est fourni
    if (dto.magasinIdMagasin) {
      const magasin = await this.magasinRepository.findOne({ where: { idMagasin: dto.magasinIdMagasin } });
      if (!magasin) {
        throw new NotFoundException('Magasin introuvable');
      }
      produit.magasin = magasin;
    }
  
    // Sauvegarder le produit mis à jour
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