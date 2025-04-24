import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class UpdateProduitDto {
  @ApiProperty({
    description: 'Le titre du produit',
    type: String,
    example: 'Nouveau titre',
    required: false,
  })
  @IsString()
  @IsOptional()
  titre?: string;

  @ApiProperty({
    description: 'La description du produit',
    type: String,
    example: 'Nouvelle description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Le prix du produit',
    type: Number,
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  prix?: number;

  @ApiProperty({
    description: 'L\'image principale du produit',
    type: String,
    example: 'image_updated.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  imagePrincipale?: string;  // Champ optionnel pour l'image principale

  @ApiProperty({
    description: 'Liste des autres images du produit',
    type: [String],
    example: ['image1.jpg', 'image2.jpg'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  images?: string[];  // Champ optionnel pour d'autres images

  @ApiProperty({
    description: 'L\'ID du magasin associé au produit',
    type: Number,
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  magasinIdMagasin?: number;
}
