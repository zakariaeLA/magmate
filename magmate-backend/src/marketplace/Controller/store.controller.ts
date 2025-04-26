import { Controller, Post, Get, Param, Body, Delete, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { StoreService } from '../service/store.service';
import { CreateMagasinDto } from '../dto/create-magasin.dto/create-magasin.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@ApiTags('magasins')  // Tags to group the endpoints in Swagger UI
@Controller('magasins')
export class StoreController {
  constructor(private readonly magasinService: StoreService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor(multerOptions))  // Use Multer for handling multiple files
  @ApiConsumes('multipart/form-data')  // Specify that the request uses form-data for file uploads
  @ApiOperation({ summary: 'Create a new store' })
  @ApiBody({
    description: 'Store data to be created, including name, description, and other details',
    type: CreateMagasinDto,  // Link to the DTO
  })
  @ApiResponse({ status: 201, description: 'The store has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Missing required fields.' })
  async create(
    @Body() dto: CreateMagasinDto,
    @UploadedFiles() files: Express.Multer.File[]  // Handle file uploads
  ) {
    // Check if files are provided
    if (files && files.length > 0) {
      dto.image = files[0].filename;  // The first file is the main image
      console.log("Main Image:", dto.image);

    } else {
      // If no files are uploaded, throw an error
      throw new BadRequestException('A valid image must be provided');
    }

    // Pass the DTO to the service to create the store
    return this.magasinService.create(dto);
  }


  @Get()
  @ApiOperation({ summary: 'Get all stores' })
  @ApiResponse({ status: 200, description: 'Retrieve all stores.' })
  findAll() {
    return this.magasinService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a store by ID' })
  @ApiResponse({ status: 200, description: 'Retrieve a store by ID.' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  findOne(@Param('id') id: number) {
    return this.magasinService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a store by ID' })
  @ApiResponse({ status: 200, description: 'Store deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  remove(@Param('id') id: number) {
    return this.magasinService.remove(+id);
  }
}