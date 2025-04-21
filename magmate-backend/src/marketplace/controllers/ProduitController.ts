import { Controller, Get, Query } from '@nestjs/common';
import { ProduitsService } from '../services/ProduitService';
import { Produit } from '../entities/Produit.entity';

@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Get()
  async getProduits(
    @Query('search') search?: string,
    @Query('ville') ville?: string,
  ): Promise<Produit[]> {
    return this.produitsService.findAll(search, ville);
  }
}
