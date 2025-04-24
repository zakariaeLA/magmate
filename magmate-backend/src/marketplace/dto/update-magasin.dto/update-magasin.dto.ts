import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  // Importer ApiProperty pour Swagger

export class UpdateMagasinDto {
  
  @ApiProperty({
    description: 'Le nom du magasin',
    type: String,
    example: 'Mon Magasin',
    required: false
  })
  @IsString()
  @IsOptional()  // Ce champ est optionnel lors de la mise à jour
  nom: string;

  @ApiProperty({
    description: 'La description du magasin',
    type: String,
    example: 'Magasin d\'électroménager et accessoires',
    required: false
  })
  @IsString()
  @IsOptional()  // Ce champ est optionnel lors de la mise à jour
  description: string;

  @ApiProperty({
    description: 'Le nom de l\'image du magasin',
    type: String,
    example: 'magasin.jpg',
    required: false
  })
  @IsString()
  @IsOptional()  // Ce champ est optionnel lors de la mise à jour
  image: string;

  @ApiProperty({
    description: 'La localisation du magasin',
    type: String,
    example: 'Rue de Paris, 123',
    required: false
  })
  @IsString()
  @IsOptional()  // Ce champ est optionnel lors de la mise à jour
  localisation: string;

  @ApiProperty({
    description: 'Les horaires d\'ouverture du magasin',
    type: String,
    example: '9:00 AM - 6:00 PM',
    required: false
  })
  @IsString()
  @IsOptional()  // Ce champ est optionnel lors de la mise à jour
  horaire: string;

  @ApiProperty({
    description: 'Le numéro de téléphone du magasin',
    type: String,
    example: '0123456789',
    required: false
  })
  @IsString()
  @IsOptional()  // Ce champ est optionnel lors de la mise à jour
  telephone: string;

  @ApiProperty({
    description: 'La ville où est situé le magasin',
    type: String,
    example: 'Paris',
    required: false
  })
  @IsString()
  @IsOptional()  // Ce champ est optionnel lors de la mise à jour
  ville: string;
}

