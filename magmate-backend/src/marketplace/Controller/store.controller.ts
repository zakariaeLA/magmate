import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { StoreService } from '../service/store.service';
import { CreateMagasinDto } from '../dto/create-magasin.dto/create-magasin.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('magasins')  // Tags to group the endpoints in Swagger UI
@Controller('magasins')
export class StoreController {
  constructor(private readonly magasinService: StoreService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new store' })
  @ApiBody({
    description: 'Store data to be created, including name, description, and other details',
    type: CreateMagasinDto,  // Link to the DTO
  })
  @Post()
  @ApiOperation({ summary: 'Create a new store' })
  @ApiBody({
    description: 'Store data to be created, including name, description, and other details',
    type: CreateMagasinDto,  // Link to the DTO
  })
  @ApiResponse({ status: 201, description: 'The store has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Missing required fields.' })
  async create(@Body() dto: CreateMagasinDto) {
    // Debug log: Check if dateCréation is provided
    console.log("Received DTO:", dto);

    // If dateCreation is not provided, set it to the current date
    
   

    // Pass the dto to the service
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
