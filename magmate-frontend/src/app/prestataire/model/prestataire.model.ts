// prestataire.model.ts

export interface Prestataire {
    idPrestataire: number;
    specialite: string;
    experience: string;
    localisation: string;
    disponibilite: boolean;
    telephone: string;
    ville: string;
    estApprouve: boolean;
    idUtilisateur: string;
  }
  