import { Produit } from './produit.model';  // Importer le modèle Produit
import { User } from './user.model';  // Importer le modèle Utilisateur

export class Reclamation {
  idReclamation: number;
  description: string;
  dateCreation: Date;
  pieceJointe: string;
  idCible: number;
  produit: Produit;
  utilisateur: User;

  constructor(
    idReclamation: number,
    description: string,
    dateCreation: Date,
    pieceJointe: string,
    idCible: number,
    produit: Produit,
    utilisateur: User
  ) {
    this.idReclamation = idReclamation;
    this.description = description;
    this.dateCreation = dateCreation;
    this.pieceJointe = pieceJointe;
    this.idCible = idCible;
    this.produit = produit;
    this.utilisateur = utilisateur;
  }
}