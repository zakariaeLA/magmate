import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importer ApiProperty pour Swagger

export class CreateMagasinDto {
  @ApiProperty({
    description: 'Le nom du magasin',
    type: String,
    example: 'Mon Magasin',
  })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({
    description: 'La description du magasin',
    type: String,
    example: "Magasin d'électroménager et accessoires",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Le nom de l'image du magasin",
    type: String,
    example: 'magasin.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'La localisation du magasin',
    type: String,
    example: 'Rue de Paris, 123',
  })
  @IsString()
  @IsNotEmpty()
  localisation: string;

  @ApiProperty({
    description: "Les horaires d'ouverture du magasin",
    type: String,
    example: '9:00 AM - 6:00 PM',
  })
  @IsString()
  @IsNotEmpty()
  horaire: string;

  @ApiProperty({
    description: 'Le numéro de téléphone du magasin',
    type: String,
    example: '0123456789',
  })
  @IsString()
  @IsNotEmpty()
  telephone: string;

  @ApiProperty({
    description: 'La ville où est situé le magasin',
    type: String,
    example: 'Paris',
  })
  @IsString()
  @IsNotEmpty()
  ville: string;

  @ApiProperty({
    description: "L'ID de l'utilisateur (propriétaire du magasin)",
    type: String,
    example: 'd4d9c564-f3c1-40b8-bfcf-6f7b3583bb90', // Exemple d'UUID
  })
  @IsUUID()
  @IsNotEmpty()
  proprietaireId: string; // L'ID de l'utilisateur qui est le propriétaire du magasin

  @ApiProperty({
    description: 'Indique si le magasin est approuvé ou non',
    type: Boolean,
    example: false,
  })
  @IsOptional() // Si ce champ est optionnel, vous pouvez l'omettre lors de la création
  estApprouve?: boolean;
}