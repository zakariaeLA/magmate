import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Récupère le token d'accès depuis les headers (Authorization)
    const token = this.getTokenFromHeader(request);

    // Si aucun token, on refuse l'accès
    if (!token) {
      throw new UnauthorizedException('Token manquant');
    }

    try {
      // Vérifie le token via Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // On peut ajouter l'utilisateur à la requête
      request.user = decodedToken;
      return true;  // Autoriser la requête
    } catch (error) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }

  // Méthode pour extraire le token depuis les headers Authorization
  private getTokenFromHeader(request: any): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];  // Retourne le token
    }
    return null;
  }
}
