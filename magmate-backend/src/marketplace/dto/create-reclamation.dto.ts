// src/marketplace/dto/create-reclamation.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReclamationDto {
  @IsNumber()
  @IsNotEmpty()
  idCible: number;  // ID du produit concerné par la réclamation

  @IsString()
  @IsNotEmpty()
  description: string;  // Description de la réclamation

  @IsString()
  @IsNotEmpty()
  pieceJointe: string;  // Pièce jointe (nom du fichier ou lien URL)

  @IsNumber()
  @IsNotEmpty()
  idUtilisateur: number;  // ID de l'utilisateur qui fait la réclamation
}
