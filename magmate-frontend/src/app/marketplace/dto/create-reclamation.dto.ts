// src/app/marketplace/models/create-reclamation.dto.ts
export interface CreateReclamationDto {
    idCible: number;         // ID du produit concerné par la réclamation
    description: string;     // Description de la réclamation
    pieceJointe: string;     // Pièce jointe (nom du fichier ou lien URL)
    idUtilisateur: string;   // ID de l'utilisateur qui fait la réclamation
  }
  