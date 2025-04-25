import { Avis } from './avis.model';  // Importer le modèle Avis
import { Reclamation } from './reclamation.model';  // Importer le modèle Reclamation
import { Magasin } from './magasin.model';  // Importer le modèle Magasin

export class Utilisateur {
  idUtilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  photoProfil: string;
  dateInscription: Date;
  motDePasse: string;
  avis: Avis[];
  reclamations: Reclamation[];
  magasins: Magasin[];

  constructor(
    idUtilisateur: number,
    nom: string,
    prenom: string,
    email: string,
    photoProfil: string,
    dateInscription: Date,
    motDePasse: string,
    avis: Avis[],
    reclamations: Reclamation[],
    magasins: Magasin[]
  ) {
    this.idUtilisateur = idUtilisateur;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.photoProfil = photoProfil;
    this.dateInscription = dateInscription;
    this.motDePasse = motDePasse;
    this.avis = avis;
    this.reclamations = reclamations;
    this.magasins = magasins;
  }
}
