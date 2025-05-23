import { IsNotEmpty, IsNumber, IsString, Min, Max, IsOptional, IsUUID, IsInt } from 'class-validator';

export class CreateAvisDto {
  // Note de l'avis, optionnelle
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()  // La note est optionnelle pour les commentaires
  note?: number; 

  // Commentaire de l'utilisateur
  @IsString()
  @IsNotEmpty()
  commentaire: string; // Le texte du commentaire



  // ID du produit concerné par l'avis
  @IsInt()
  idProduit: number; // ID du produit concerné, doit être un nombre entier

  @IsString()
  @IsNotEmpty()
  email: string; // Ajout de l'email de l'utilisateur
  
}