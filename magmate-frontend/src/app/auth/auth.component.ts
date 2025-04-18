import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone:false,
})
export class AuthComponent {
  user: firebase.User | null = null;

constructor(private afAuth: AngularFireAuth) {
  this.afAuth.authState.subscribe(user => {
    this.user = user;
    if (user) {
      console.log('👤 Utilisateur connecté :', user.displayName, user.email);
    }
  });
}


  async loginWithGoogle() {
    try {
      const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      console.log('✅ Connecté avec succès :', result.user);
      const token = await result.user?.getIdToken();
      console.log('🛡️ Token Firebase :', token);
    } catch (error) {
      console.error('❌ Erreur lors de la connexion Google', error);
    }
  }

  logout() {
    this.afAuth.signOut();
  }
}
