import { Produit } from './produit.model';  // Importer le modèle Produit
import { Utilisateur } from './utilisateur.model';  // Importer le modèle Utilisateur

export class Reclamation {
  idReclamation: number;
  description: string;
  dateCreation: Date;
  pieceJointe: string;
  idCible: number;
  produit: Produit;
  utilisateur: Utilisateur;

  constructor(
    idReclamation: number,
    description: string,
    dateCreation: Date,
    pieceJointe: string,
    idCible: number,
    produit: Produit,
    utilisateur: Utilisateur
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
