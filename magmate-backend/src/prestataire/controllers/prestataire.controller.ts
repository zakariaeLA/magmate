import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
} from '@nestjs/common';

import { PrestataireService } from '../services/prestataire.service';
import { Prestataire } from '../entities/prestataire.entity';
//import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';

@Controller('prestataires')
export class PrestataireController {
  constructor(private readonly prestataireService: PrestataireService) {}

  @Get()
  findAll(
    @Query('ville') ville?: string,
    @Query('query') query?: string,
  ): Promise<Prestataire[]> {
    return this.prestataireService.findFiltered(ville, query);
  }
  /*@Get('user/:idUtilisateur')
  findByUtilisateur(@Param('idUtilisateur') idUtilisateur: string) {
    return this.prestataireService.findByUtilisateurId(idUtilisateur);
  }*/

  @Get('is-prestataire')
  async isPrestataire(@Query('uuid') uuid: string) {
    try {
      await this.prestataireService.findByUuid(uuid);
      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return false;
      }
      throw error; // pour ne pas masquer d'autres erreurs éventuelles
    }
  }

  @Get(':uuid') // Utilisation du paramètre UUID dans l'URL
  async findByUuid(@Param('uuid') uuid: string): Promise<Prestataire> {
    return this.prestataireService.findByUuid(uuid); // Appel de la méthode de service
  }
  @Patch(':id/disponibilite')
  updateDisponibilite(
    @Param('id') id: string,
    @Body('disponibilite') disponibilite: boolean,
  ) {
    return this.prestataireService.updateDisponibilite(id, disponibilite);
  }
}
