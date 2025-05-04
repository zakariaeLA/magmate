export interface User {
  id: string; // UUID
  email: string;
  password?: string | null; // Le mot de passe peut être nul ou vide
  role: 'admin' | 'normal_user'; // Type enum
  fname: string;
  lname: string;
  photo?: string; // Photo utilisateur, peut être vide
  registrationDate: Date; // Date d'inscription
  avis: Avis[]; // Liste des avis associés à l'utilisateur
  reclamations: Reclamation[]; // Liste des réclamations associées à l'utilisateur
  magasins: Magasin[]; // Liste des magasins associés à l'utilisateur
}

// Interface pour les avis
export interface Avis {
  idAvis: string;
  comment: string;
  rating: number;
  date: Date;
  auteur: User;
}

// Interface pour les réclamations
export interface Reclamation {
  idReclamation: string;
  description: string;
  date: Date;
  utilisateur: User;
}

// Interface pour les magasins
export interface Magasin {
  idMagasin: string;
  name: string;
  description: string;
  proprietaire: User;
}
