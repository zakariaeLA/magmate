// src/marketplace/controllers/reclamation.controller.ts
import { Controller, Post,Get, Body, Param, UseGuards } from '@nestjs/common';
import { ReclamationService } from '../services/reclamation.service';
import { CreateReclamationDto } from '../dto/create-reclamation.dto';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('reclamations')  
export class ReclamationController {
  constructor(private readonly reclamationService: ReclamationService) {}

  @UseGuards(FirebaseAuthGuard)
  
  @Post(':productId')  
  async addReclamation(
    @Param('productId') productId: number,  
    @Body() createReclamationDto: CreateReclamationDto,
    @GetUser() user: RequestWithUser['user']
  ) {
    
    createReclamationDto.idCible = productId;

    
    return this.reclamationService.createReclamation(createReclamationDto, user);
  }

  
  @Get(':productId')
  async getReclamations(
    @Param('productId') productId: number,  
  ) {
   
    return this.reclamationService.getReclamationsByProductId(productId);
  }
}
