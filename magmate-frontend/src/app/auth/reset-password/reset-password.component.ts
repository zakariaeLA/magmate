// auth/reset-password/reset-password.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: false,
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit() {
    const email = this.resetForm.value.email;
    this.message = '';
    this.error = '';

    try {
      await this.afAuth.sendPasswordResetEmail(email);
      this.message = "📧 Un email de réinitialisation vous a été envoyé.";
    } catch (err: any) {
      this.error = this.getErrorMessage(err.code);
    }
  }

  getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return "Aucun utilisateur trouvé avec cette adresse.";
      case 'auth/invalid-email':
        return "Adresse email invalide.";
      default:
        return "Une erreur est survenue. Veuillez réessayer.";
    }
  }
}
