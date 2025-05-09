import { IsNotEmpty, IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateReclamationPrestataireDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsUUID()
  @IsNotEmpty()
  prestataireId: string;

  @IsOptional()
  @IsString()
  pieceJointe?: string;
}
