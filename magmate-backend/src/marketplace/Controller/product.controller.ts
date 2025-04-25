import { Controller, Get, Param, Post, Body, UseInterceptors, UploadedFiles, Delete, Put, BadRequestException } from '@nestjs/common';
import { ProduitService } from '../service/product.service';
import { CreateProduitDto } from '../dto/create-produit.dto/create-produit.dto';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';  // Pour accepter plusieurs fichiers
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { multerOptions } from 'src/config/multer.config';

@ApiTags('produits')  // Tags to group the endpoints in Swagger UI
@Controller('produits')
export class ProductController {
  constructor(private readonly produitService: ProduitService) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor(multerOptions))  // Use Multer configuration here
  @ApiConsumes('multipart/form-data')  // Tells Swagger this endpoint uses form-data for file uploads
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({
    description: 'Product data including images',
    type: CreateProduitDto,  // Use the DTO that will be passed to the body
  })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Image principal is required.' })
  async create(@Body() dto: CreateProduitDto, @UploadedFiles() files: Express.Multer.File[]) {
    // Ensure that files are provided and that the first file is the main image
    if (files && files.length > 0) {
      dto.imagePrincipale = files[0].filename;
      console.log(dto.imagePrincipale);  // First file is the main image
      dto.images = files.slice(1).map(file => file.filename);  // Other files are additional images
    } else {
      // If no files are provided, throw an error
      throw new BadRequestException('Une image principale doit être fournie');
    }

    console.log("Image principale:", dto.imagePrincipale);
    console.log("Autres images:", dto.images);

    // Create the product with the images
    return this.produitService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Retrieve all products.' })
  async findAll() {
    return this.produitService.findAll();  // Get all products
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Retrieve a product by ID.' })
  async findOne(@Param('id') id: number) {
    return this.produitService.findOne(id);  // Get a single product by ID
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  async remove(@Param('id') id: number) {
    return this.produitService.remove(id);  // Delete a product by ID
  }

  // Mettre à jour un produit
  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @UseInterceptors(AnyFilesInterceptor())  // Utiliser AnyFilesInterceptor pour accepter plusieurs fichiers
  async update(@Param('id') id: number, @Body() dto: Partial<CreateProduitDto>, @UploadedFiles() files: Express.Multer.File[]) {
    // Vérifier si des fichiers sont envoyés pour l'image principale et les autres images
    if (files && files.length > 0) {
      dto.imagePrincipale = files[0].filename;  // L'image principale est le premier fichier de la liste
      dto.images = files.slice(1).map(file => file.filename);  // Les autres fichiers sont des images supplémentaires
    }

    return this.produitService.update(id, dto);  // Mettre à jour le produit
  }
}
