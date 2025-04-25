import { Utilisateur } from './utilisateur.model';  // Importer le modèle Utilisateur
import { Produit } from './produit.model';  // Importer le modèle Produit

export class Avis {
  idAvis: number;
  note: number;
  commentaire: string;
  date: Date;
  auteur: Utilisateur;
  produit: Produit;

  constructor(
    idAvis: number,
    note: number,
    commentaire: string,
    date: Date,
    auteur: Utilisateur,
    produit: Produit
  ) {
    this.idAvis = idAvis;
    this.note = note;
    this.commentaire = commentaire;
    this.date = date;
    this.auteur = auteur;
    this.produit = produit;
  }
}
