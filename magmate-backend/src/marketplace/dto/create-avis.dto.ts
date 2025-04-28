import { IsNotEmpty, IsNumber, IsString, Min, Max, IsOptional } from 'class-validator';

export class CreateAvisDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()  // La note est optionnelle pour les commentaires
  note?: number; // Étoiles (c'est une option pour les commentaires)

  @IsString()
  @IsNotEmpty()
  commentaire: string; // Commentaire

  @IsNumber()
  idUtilisateur:string; // ID de l'utilisateur qui fait l'avis ou le commentaire

  @IsNumber()
  idProduit: number; // ID du produit concerné par l'avis ou le commentaire
}
