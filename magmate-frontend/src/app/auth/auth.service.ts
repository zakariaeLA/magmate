import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Utilisez AngularFireAuth
import { Router } from '@angular/router';
import { environment } from  '../../environments/environment'; // Votre configuration Firebase
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,  // Injection de AngularFireAuth
    private router: Router
  ) {}

  // Utilisez AngularFireAuth pour obtenir le token de l'utilisateur
  async getIdToken(): Promise<string | null> {
    const user = await this.afAuth.currentUser; // Récupère l'utilisateur actuel
    if (user) {
      return await user.getIdToken(); // Obtenir le token directement
    }
    return null;
  }

  

  async loginBackend() {
    const token = await this.getIdToken();
    if (token) {
      return firstValueFrom(this.http.post(`${this.API}/login`, { token }));
    } else {
      throw new Error("Token non trouvé");
    }
  }

  async signupBackend(fname: string, lname: string, password: string) {
    const token = await this.getIdToken();
    if (token) {
      return firstValueFrom(
        this.http.post(`${this.API}/signup`, {
          token,
          fname,
          lname,
          password,
        })
      );
    } else {
      throw new Error("Token non trouvé");
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();  // Déconnexion via AngularFireAuth
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  }
}
