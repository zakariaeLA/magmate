// src/marketplace/controllers/product.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from '../services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Route pour récupérer un produit par son ID

  @Get(':id')
  async getProductDetails(@Param('id') id: number) {
    const product = await this.productService.getProductById(id);

    if (product) {
      // Ajouter l'URL complète de l'image principale
      product.imagePrincipale = `http://localhost:3000/public/images/${product.imagePrincipale}`;
    }

    return product;
  }
}
