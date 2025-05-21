import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ReclamationPrestataireService } from '../services/reclamation-prestataire.service';
import { CreateReclamationPrestataireDto } from '../dto/create-reclamation-prestataire.dto';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('prestataires/reclamations')
export class ReclamationPrestataireController {
  constructor(private readonly reclamationService: ReclamationPrestataireService) {}

  @Post(':idPrestataire')
  @UseGuards(FirebaseAuthGuard)
  async addReclamation(
    @Param('idPrestataire') idPrestataire: string,
    @Body() dto: CreateReclamationPrestataireDto,
    @GetUser() user: RequestWithUser['user'],
  ) {
    // Associer l'ID du prestataire depuis le paramètre URL
    dto.prestataireId = idPrestataire;

    console.log('Payload reçu :', dto);
    return this.reclamationService.createReclamation(dto, user);
  }
}
