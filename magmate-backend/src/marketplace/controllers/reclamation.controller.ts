// src/marketplace/controllers/reclamation.controller.ts
import { Controller, Post,Get, Body, Param } from '@nestjs/common';
import { ReclamationService } from '../services/reclamation.service';
import { CreateReclamationDto } from '../dto/create-reclamation.dto';

@Controller('reclamations')  // Route de base : /reclamations
export class ReclamationController {
  constructor(private readonly reclamationService: ReclamationService) {}

  // Route pour ajouter une réclamation
  @Post(':productId')  // Recevoir l'ID du produit dans l'URL
  async addReclamation(
    @Param('productId') productId: number,  // L'ID du produit est pris de l'URL
    @Body() createReclamationDto: CreateReclamationDto  // Le corps contient les infos de la réclamation
  ) {
    // Ajouter l'ID du produit dans le DTO (il est déjà passé dans l'URL)
    createReclamationDto.idCible = productId;

    // Appeler le service pour créer la réclamation
    return this.reclamationService.createReclamation(createReclamationDto);
  }

  // Route pour récupérer les réclamations d'un produit
  @Get(':productId')
  async getReclamations(
    @Param('productId') productId: number,  // L'ID du produit est pris de l'URL
  ) {
    // Appelle le service pour récupérer les réclamations du produit par son ID
    return this.reclamationService.getReclamationsByProductId(productId);
  }
}
