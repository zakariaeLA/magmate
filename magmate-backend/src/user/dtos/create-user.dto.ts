import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  
  @IsNotEmpty()
  fname: string;

  @IsNotEmpty()
  lname: string;
}
