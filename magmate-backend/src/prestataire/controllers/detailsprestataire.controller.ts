import {
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';

import { PrestatairedetailsService } from '../services/prestatairedetails.service';
import { Prestataire } from '../entities/prestataire.entity';

@Controller('prestataires')
export class PrestatairedetailsController {
  constructor(private readonly prestataireDetailsService: PrestatairedetailsService) {}

  /**
   * GET /prestataires/:idPrestataire
   * Récupère les détails d'un prestataire par son `idPrestataire`
   */
  @Get(':idPrestataire')
  async getPrestataireDetails(
    @Param('idPrestataire') idPrestataire: string,
  ): Promise<Prestataire> {
    const prestataire = await this.prestataireDetailsService.findById(idPrestataire);

    if (!prestataire) {
      throw new NotFoundException(`Prestataire avec l'ID ${idPrestataire} non trouvé`);
    }

    return prestataire;
  }
}
