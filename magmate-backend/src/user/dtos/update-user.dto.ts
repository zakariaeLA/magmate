import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fname: string;
  
  @IsOptional()
  @IsString()
  lname: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
  
  @IsOptional()
  @IsString()
  photo: string;

}
