import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false,
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async signup() {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      console.log('✅ Inscription réussie :', userCredential.user);
      // Rediriger l'utilisateur vers la page de connexion après inscription réussie
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('❌ Erreur lors de l\'inscription', error);
    }
  }
}
