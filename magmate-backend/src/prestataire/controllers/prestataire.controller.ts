import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { PrestataireService } from '../services/prestataire.service';
  import { CreatePrestataireDto } from '../dto/create-prestataire.dto';
  import { UpdatePrestataireDto } from '../dto/update-prestataire.dto';
  import { FirebaseAuthGuard } from '../../auth/firebase-auth.guard';
  @Controller('prestataire')
  //@UseGuards(FirebaseAuthGuard)
  export class PrestataireController {
    constructor(private readonly service: PrestataireService) {}
  
    @Post()
    create(@Body() dto: CreatePrestataireDto, @Req() req: any) {
      let userId = 'f1abb309-55ea-4574-8c2e-314dd77a83d9'
      return this.service.create(dto, userId);

      //return this.service.create(dto, req.user.userId);
    }
  
    @Get('me')
    getMe(@Req() req: any) {
      return this.service.findByUserId('f97b40ae-8106-4ada-9a34-d15881bb611b');
    }
  
    @Put('me')
    update(@Body() dto: UpdatePrestataireDto, @Req() req: any) {
      return this.service.update('f97b40ae-8106-4ada-9a34-d15881bb611b', dto);
      //return this.service.update(req.user.userId, dto);
    }
  
    @Delete('me')
    delete(@Req() req: any) {
      return this.service.deleteByUserId(req.user.userId);
    }
  }
  