// update-magasin.dto.ts
import { IsOptional, IsString, IsBoolean, IsPhoneNumber, IsDateString } from 'class-validator';

export class UpdateMagasinDto {
  @IsOptional()  // Optionnel, seulement si vous ne souhaitez pas obliger la mise à jour
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  localisation?: string;

  @IsOptional()
  @IsString()
  horaire?: string;

  @IsOptional()
  @IsPhoneNumber('FR')  // Validation de numéro de téléphone (ici pour la France, à ajuster pour d'autres pays)
  telephone?: string;

  @IsOptional()
  @IsString()
  ville?: string;

  @IsOptional()
  @IsString()
  image?: string;  // Image, si elle est fournie

  @IsOptional()
  @IsBoolean()
  estApprove?: boolean;  // S'il y a une approbation ou non
}
