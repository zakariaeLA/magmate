// signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false,
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signInWithGoogle() {
    this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        console.log('Connecté avec Google :', result.user);
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        this.errorMessage = this.getErrorMessage(error.code);
      });
  }

  async onSubmit() {
    if (this.signupForm.invalid) return;
    const { email, password } = this.signupForm.value;

    try {
      // 1) Crée l’utilisateur Firebase
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await result.user?.sendEmailVerification();
      this.successMessage = '📧 Vérifiez votre email pour confirmer le compte';

      // 2) Appel au backend pour créer / mettre à jour le profil
      const backendUser = await this.authService.signupBackend();
      console.log('👌 Backend a enregistré :', backendUser);

      // 3) (Optionnel) redirection vers login
      setTimeout(() => this.router.navigate(['/login']), 2000);
    } catch (err: any) {
      this.errorMessage = this.getErrorMessage(err.code);
      this.successMessage = '';
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById(
      'password'
    ) as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.showPassword ? 'text' : 'password';
    }
  }

  getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Cet email est déjà utilisé.';
      case 'auth/invalid-email':
        return 'Email invalide.';
      case 'auth/weak-password':
        return 'Mot de passe trop faible.';
      case 'auth/operation-not-allowed':
        return 'Opération non autorisée.';
      case 'auth/popup-closed-by-user':
        return 'Fenêtre de connexion fermée avant la fin.';
      default:
        return 'Erreur inconnue : ' + code;
    }
  }
}
