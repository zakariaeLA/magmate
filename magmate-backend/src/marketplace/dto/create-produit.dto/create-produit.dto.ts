import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  // Importer ApiProperty pour Swagger

export class CreateProduitDto {
  
  @ApiProperty({
    description: 'Le titre du produit',
    type: String,
    example: 'Téléviseur 4K'
  })
  @IsString()
  @IsNotEmpty()
  titre: string;

  @ApiProperty({
    description: 'La description du produit',
    type: String,
    example: 'Téléviseur 4K avec des fonctionnalités avancées.'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Le prix du produit',
    type: Number,
    example: 1500
  })
  @IsNumber()
  @IsNotEmpty()
  prix: number;

  @ApiProperty({
    description: 'L\'image principale du produit',
    type: String,
    example: 'imagePrincipale.jpg'
  })
  @IsString()
  @IsNotEmpty()
  imagePrincipale: string;

  @ApiProperty({
    description: 'Tableau des images supplémentaires du produit',
    type: [String],
    example: ['image1.jpg', 'image2.jpg']
  })
  @IsArray()
  @IsOptional()  // L'ajout d'images supplémentaires est optionnel
  images: string[];

  @ApiProperty({
    description: 'L\'ID du magasin auquel ce produit appartient',
    type: Number,
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  magasinIdMagasin: number;
}
