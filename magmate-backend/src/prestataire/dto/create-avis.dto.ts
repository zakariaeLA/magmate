import { IsNotEmpty, IsString, IsInt, Min, Max, IsUUID } from 'class-validator';

export class CreateAvisDto {
  @IsInt()
  @Min(1)
  @Max(5)
  note: number;

  @IsString()
  @IsNotEmpty()
  commentaire: string;

  @IsUUID()
  @IsNotEmpty()
  prestataireId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string; // L'utilisateur qui crée le commentaire
}
