import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { StoreService } from '../service/store.service';
import { CreateMagasinDto } from '../dto/create-magasin.dto/create-magasin.dto';
import { UpdateMagasinDto } from '../dto/update-magasin.dto/update-magasin.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { User } from 'src/user/entities/user.entity'; // Importer le modèle de l'utilisateur pour vérification

@ApiTags('magasins') // Tags to group the endpoints in Swagger UI
@Controller('magasins')
export class StoreController {
  constructor(private readonly magasinService: StoreService) {}

  @Post()
@UseInterceptors(AnyFilesInterceptor(multerOptions))
async create(
  @UploadedFiles() files: Express.Multer.File[],
  @Body() formData: any, // Recevoir les données brutes
) {
  // Debug: afficher tout ce qui est reçu
  console.log('FormData reçu:', formData);
  console.log('Fichiers reçus:', files);
/* zineb */
  // Convertir les données textuelles en DTO
  const dto: CreateMagasinDto = {
    nom: formData.nom,
    description: formData.description,
    localisation: formData.localisation,
    horaire: formData.horaire,
    telephone: formData.telephone,
    ville: formData.ville,
    proprietaireId: formData.proprietaireId,
    estApprouve: formData.estApprouve === 'true', // Conversion si nécessaire
    image: files?.[0]?.filename || '' // Gérer le fichier
  };

  // Validation manuelle si nécessaire
  if (!files || files.length === 0) {
    throw new BadRequestException('Image is required');
  }

  // Reste du code inchangé...
  const user = await this.magasinService.checkUserExistence(dto.proprietaireId);
  if (!user) {
    throw new NotFoundException('Utilisateur non trouvé');
  }

  return this.magasinService.create(dto);
}

  @Get()
  @ApiOperation({ summary: 'Get all stores' })
  @ApiResponse({ status: 200, description: 'Retrieve all stores.' })
  findAll() {
    return this.magasinService.findAll();
  }

  @Get(':idMagasin')
  @ApiOperation({ summary: 'Get a store by ID' })
  @ApiResponse({ status: 200, description: 'Retrieve a store by ID.' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  findOne(@Param('idMagasin') idMagasin: number) {
    return this.magasinService.findOne(+idMagasin);
  }

  @Put(':idMagasin')
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update a store by ID' })
  @ApiResponse({ status: 200, description: 'Store updated successfully.' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  async update(
    @Param('idMagasin') idMagasin: number,
    @Body() dto: UpdateMagasinDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files && files.length > 0) {
      dto.image = files[0].filename;
    }
    return this.magasinService.update(idMagasin, dto);
  }

  @Delete(':idMagasin')
  @ApiOperation({ summary: 'Delete a store by ID' })
  @ApiResponse({ status: 200, description: 'Store deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  remove(@Param('idMagasin') idMagasin: number) {
    return this.magasinService.remove(+idMagasin);
  }
}