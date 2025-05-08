import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PrestataireService } from '../services/prestatairedetails.service';
import { FirebaseAuthGuard } from '../../auth/firebase-auth.guard';

@Controller('prestataires')
export class PrestataireController {
  constructor(private readonly prestataireService: PrestataireService) {}

  /**
   * Récupérer le profil prestataire par UUID utilisateur
   */
  @Get('uuid/:uuid')
  async getByUuid(@Param('uuid') uuid: string) {
    return this.prestataireService.findByUuid(uuid);
  }

  /**
   * Récupérer le profil prestataire par email utilisateur
   */
  @Get('email/:email')
  async getByEmail(@Param('email') email: string) {
    return this.prestataireService.findByEmail(email);
  }
}
