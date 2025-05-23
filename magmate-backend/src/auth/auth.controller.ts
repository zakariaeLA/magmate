// src/auth/auth.controller.ts
import { Body, Controller, Post, UnauthorizedException, Headers} from '@nestjs/common';

import * as admin from 'firebase-admin';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('token') token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return await this.authService.loginOrCreateUser(decodedToken);
      
    } catch (error) {
      throw new UnauthorizedException('Token Firebase invalide');
    }
  }

  @Post('signup')
  async signup(
    @Body('token') token: string,
    @Body('fname') fname: string,
    @Body('lname') lname: string,
    @Body('password') password: string,
  ) {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await this.authService.loginOrCreateUser(
      decodedToken,
      fname,
      lname,
      password
    );
    return user;
  }

/* zineb */
  /* meilleur approche 
@Post('get-user-id')
async getUserId(@Body('email') email: string) {
  try {
    return await this.authService.getUserIdByEmail(email);
  } catch (error) {
    throw new UnauthorizedException(error.message);
  }
}
  */
/* zineb */
@Post('get-user-id-by-token')
async getUserIdByToken(@Body('token') token: string) {
  try {
    const userId = await this.authService.getUserIdByToken(token);
    return { userId }; // Retourne un objet au lieu d'une string
  } catch (error) {
    throw new UnauthorizedException(error.message);
  }
}



}
