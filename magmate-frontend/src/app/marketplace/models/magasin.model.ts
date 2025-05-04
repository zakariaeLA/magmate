import { User } from './user.model';
export class Magasin {
    idMagasin: number;
    nom: string;
    description: string;
    image: string;
    dateCreation: Date;
    localisation: string;
    horaire: string;
    telephone: string;
    ville: string;
    proprietaire: User;  
  
    constructor(
      idMagasin: number,
      nom: string,
      description: string,
      image: string,
      dateCreation: Date,
      localisation: string,
      horaire: string,
      telephone: string,
      ville: string,
      proprietaire: User
    ) {
      this.idMagasin = idMagasin;
      this.nom = nom;
      this.description = description;
      this.image = image;
      this.dateCreation = dateCreation;
      this.localisation = localisation;
      this.horaire = horaire;
      this.telephone = telephone;
      this.ville = ville;
      this.proprietaire = proprietaire;
    }
  }
  