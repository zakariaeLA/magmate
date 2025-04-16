import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:false,
})
export class LoginComponent {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  email: string = '';
  password: string = '';
  async loginWithGoogle() {
    try {
      const result = await this.afAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      console.log('✅ Connecté avec succès :', result.user);
      const token = await result.user?.getIdToken();
      console.log('🛡️ Token Firebase :', token);

      // Envoyer le token au backend pour vérification
      this.authenticateWithBackend(token);
    } catch (error) {
      console.error('❌ Erreur lors de la connexion Google', error);
    }
  }

  // Fonction pour envoyer le token au backend
  authenticateWithBackend(token: string | undefined) {
    if (token) {
      // Utiliser le token pour authentifier l'utilisateur auprès du backend
      fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('✅ Authentification réussie avec le backend :', data);
          // Rediriger l'utilisateur vers la page d'accueil après connexion réussie
          this.router.navigate(['/dashboard']);
        })
        .catch((error) => {
          console.error('❌ Erreur de connexion avec le backend', error);
        });
    }
  }
}
