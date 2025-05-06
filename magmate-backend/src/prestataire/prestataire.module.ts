import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestataireController } from './controllers/prestataire.controller';
import { PrestataireService } from './services/prestataire.service';
import { Prestataire } from './entities/prestataire.entity';

@Module({
  controllers: [PrestataireController],
  providers: [PrestataireService],
  imports: [TypeOrmModule.forFeature([Prestataire])],
  exports: [TypeOrmModule],
})
export class PrestataireModule {}
