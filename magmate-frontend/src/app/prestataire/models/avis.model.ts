import { User } from './user.model';  // Importer le modèle Utilisateur
import { Prestataire } from './prestataire.model';  // Importer le modèle Produit

export class Avis {
  idAvis: number;
  note: number;
  commentaire: string;
  date: Date;
  auteur: User;
  prestataire: Prestataire;

  constructor(
    idAvis: number,
    note: number,
    commentaire: string,
    date: Date,
    auteur: User,
    prestataire: Prestataire
  ) {
    this.idAvis = idAvis;
    this.note = note;
    this.commentaire = commentaire;
    this.date = date;
    this.auteur = auteur;
    this.prestataire = prestataire;
  }
}