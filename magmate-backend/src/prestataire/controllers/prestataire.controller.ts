import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  Post,
  Put,
  Delete,
  Req,
  
} from '@nestjs/common';

import { PrestataireService } from '../services/prestataire.service';
import { Prestataire } from '../entities/prestataire.entity';

import { CreatePrestataireDto } from '../dto/create-prestataire.dto';
import { UpdatePrestataireDto } from '../dto/update-prestataire.dto';

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
  @Get('uuid/:uuid')
  getByUuid(@Param('uuid') uuid: string) {
    return this.prestataireService.findByUserId(uuid);
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
  @Post()
  create(@Body() dto: CreatePrestataireDto, @Req() req: any) {
    let userId = 'f1abb309-55ea-4574-8c2e-314dd77a83d9';
    return this.prestataireService.create(dto, userId);

    //return this.service.create(dto, req.user.userId);
  }
  @Post('create-with-uuid/:uuid')
  createWithUuid(
    @Param('uuid') uuid: string,
    @Body() dto: CreatePrestataireDto,
  ) {
    return this.prestataireService.create(dto, uuid);
  }

  @Get('me')
  getMe(@Req() req: any) {
    return this.prestataireService.findByUserId(
      'f97b40ae-8106-4ada-9a34-d15881bb611b',
    );
  }
  @Get('me/:uuid')
  getMe2(@Param('uuid') uuid: string) {
    return this.prestataireService.findByUserId(uuid);
  }

  /*@Put('me')
  update(@Body() dto: UpdatePrestataireDto, @Req() req: any) {
    return this.prestataireService.update(
      'f97b40ae-8106-4ada-9a34-d15881bb611b',
      dto,
    );
    //return this.service.update(req.user.userId, dto);
  }*/
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePrestataireDto) {
    return this.prestataireService.update(id, dto);
  }

  /*@Delete('me')
  delete(@Req() req: any) {
    return this.prestataireService.deleteByUserId(req.user.userId);
  }*/
  @Delete(':id')
  async deletePrestataire(@Param('id') id: string): Promise<void> {
    return this.prestataireService.deletePrestataire(id);
  }
}
