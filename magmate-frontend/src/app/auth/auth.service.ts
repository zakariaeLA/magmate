import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { getAuth } from '@angular/fire/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';  // Utilisez AngularFireAuth
import { Router } from '@angular/router';
import { environment } from  '../../environments/environment'; // Votre configuration Firebase

import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient,

    private afAuth: AngularFireAuth,
    private router: Router
  ) {}
  
  
  // Récupère le token Firebase actuel

  async getIdToken(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      return token;
    }
    return null;
  }
  
  
  


  async loginBackend() {
    return firstValueFrom(this.http.post(`${this.API}/login`, { token: await this.getIdToken() }));
  }

  async signupBackend(fname: string, lname: string, password: string) {
    ;

    return firstValueFrom(
      this.http.post(`${this.API}/signup`, {
        token: await this.getIdToken() ,
        fname,
        lname,
        password,
      })
    );

  }

  async logout(): Promise<void> {
    try {

      await this.afAuth.signOut();

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  }
}
