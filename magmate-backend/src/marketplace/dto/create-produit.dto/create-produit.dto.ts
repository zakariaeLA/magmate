import { ApiProperty } from '@nestjs/swagger';

export class CreateProduitDto {
  @ApiProperty({
    description: 'The title of the product',
  })
  titre: string;

  @ApiProperty({
    description: 'A detailed description of the product',
  })
  description: string;

  @ApiProperty({
    description: 'The price of the product',
  })
  prix: number;

  @ApiProperty({
    description: 'The main image of the product',
    type: 'string',
    format: 'binary', // This indicates that this field will be a file upload in Swagger
  })
  imagePrincipale: string; // Main image (required)

  @ApiProperty({
    description: 'Additional images of the product',
    type: 'array',
    items: { type: 'string', format: 'binary' }, // This is for file uploads as well
    required: false, // Images are optional
  })
  images: string[]; // Array of additional images (optional)

  @ApiProperty({
    description: 'The ID of the associated store (magasin)',
  })
  magasinIdMagasin: number;
}
