import { Global, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { join } from 'path';
import * as fs from 'fs';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        try {
          // Si l'application est déjà initialisée, ne pas la réinitialiser
          if (!admin.apps.length) {
            const serviceAccountPath = join(__dirname, '..', '..', 'firebase-service-account.json');
            const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
            admin.initializeApp({
              credential: admin.credential.cert(serviceAccount),
            });
          }
          return admin.apps[0]; // Retourner l'application Firebase initialisée
        } catch (error) {
          console.error('Erreur lors de l\'initialisation de Firebase:', error);
        }
        const serviceAccountPath = join(
          __dirname,
          '..',
          '..',
          'firebase-service-account.json',
        );
        const serviceAccount = JSON.parse(
          fs.readFileSync(serviceAccountPath, 'utf8'),
        );

        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseAdminModule {}
