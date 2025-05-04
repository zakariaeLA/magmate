// src/app/marketplace/models/create-avis.dto.ts
export interface CreateAvisDto {
  note?: number;          // Optionnel (pour la note de 1 à 5 étoiles)
  commentaire: string;    // Le texte du commentaire
  id:string;  // ID de l'utilisateur qui fait l'avis
  idProduit: number;      // ID du produit concerné par le commentaire
}
