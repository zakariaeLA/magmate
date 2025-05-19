import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Delete, // Ajouter le décorateur Delete
  HttpException,
  HttpStatus, // Importer HttpStatus
  ParseUUIDPipe
} from '@nestjs/common';
import { MagasinService } from '../services/MagasinService';
import { ProduitsService } from '../services/ProduitService';
import { Magasin } from '../entities/magasin.entity';
import { Produit } from '../entities/produit.entity';

@Controller('magasins')
export class MagasinController {
  constructor(
    private readonly magasinService: MagasinService,
    private readonly produitsService: ProduitsService,
  ) {}

  @Get('user/:userId')
  async getMagasinByUser(
    @Param('userId', ParseUUIDPipe) userId: string // Validation UUID
  ): Promise<Magasin> {
    const magasin = await this.magasinService.findByUserId(userId);
    if (!magasin) {
      throw new HttpException('Magasin non trouvé', HttpStatus.NOT_FOUND);
    }
    return magasin;
  }
/*
@Get('user/:firebaseUid')
async getMagasinByUser(
  @Param('firebaseUid') firebaseUid: string
) {
  const user = await this.userService.findByFirebaseUid(firebaseUid);
  
  if (!user) {
    throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
  }

  if (!user.magasin) {
    throw new HttpException('Cet utilisateur n\'a pas de magasin', HttpStatus.NOT_FOUND);
  }

  return user.magasin;
}
// Dans MagasinController
@Get('user-uuid/:firebaseUid')
async getUUIDFromFirebaseUid(
  @Param('firebaseUid') firebaseUid: string
) {
  const user = await this.userService.findByFirebaseUid(firebaseUid);
  if (!user) {
    throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
  }
  return { uuid: user.id }; // Retourne l'UUID de l'utilisateur
}
*/
  
  // Récupérer les produits par magasin
  @Get(':magasinId/produits')
  async getProduitsByMagasin(
    @Param('magasinId', ParseIntPipe) magasinId: number,
  ): Promise<Produit[]> {
    return this.produitsService.getProduitsByMagasin(magasinId);
  }

  @Delete(':id') // Ajouter le décorateur @Delete pour la suppression
  async deleteMagasin(@Param('id') id: number) {
    try {
      await this.magasinService.deleteMagasin(id);
      return {
        message: `Le magasin avec l'ID ${id} a été supprimé avec succès.`,
      };
    } catch (error) {
      // Si une exception est levée, on la gère ici
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
