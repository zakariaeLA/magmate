// src/app/marketplace/models/utilisateur.model.ts

export enum UserRole {
  ADMIN = 'admin',
  NORMAL_USER = 'normal_user',
}

export interface Utilisateur {
  idUtilisateur: string;
  email: string;
  password?: string | null;
  role: UserRole;
  fname: string;     // Prénom
  lname: string;     // Nom de famille
  photo?: string;    // URL photo de profil, optionnelle
  registrationDate: Date;
  // Si jamais tu as besoin de charger aussi :
  avis?: any[]; // Tu peux typer mieux si besoin plus tard
  reclamations?: any[];
  magasins?: any[];
}
