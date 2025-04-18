// src/auth/auth.controller.ts
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
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
  async signup(@Body('token') token: string) {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await this.authService.loginOrCreateUser(decodedToken); // réutilisation possible
    return user;
  }
}
