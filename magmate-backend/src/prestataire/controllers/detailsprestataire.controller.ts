import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PrestatairedetailsService } from '../services/prestatairedetails.service';
import { FirebaseAuthGuard } from '../../auth/firebase-auth.guard';

@Controller('prestataires')
export class PrestatairedetailsController{
  constructor(private readonly prestataireService: PrestatairedetailsService) {}

  /**
   * Récupérer le profil prestataire par UUID utilisateur
   */
  @Get('uuid/:uuid')
  async getByUuid(@Param('uuid') uuid: string) {
    return this.prestataireService.findByUuid(uuid);
  }

}
