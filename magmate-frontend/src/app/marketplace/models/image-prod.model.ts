import { Produit } from './produit.model';  // Importer le modèle Produit

export class ImageProd {
  idImage: number;
  imageURL: string;
  produit: Produit;

  constructor(idImage: number, imageURL: string, produit: Produit) {
    this.idImage = idImage;
    this.imageURL = imageURL;
    this.produit = produit;
  }
}
