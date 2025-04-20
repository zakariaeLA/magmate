import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAuth } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  // Récupère le token Firebase actuel
  async getIdToken(): Promise<string | null> {
    const user = getAuth().currentUser;
    return user ? await user.getIdToken() : null;
  }

  // Appelle ton endpoint backend /auth/login avec le token
  async loginBackend() {
    const token = await this.getIdToken();
    if (!token) throw new Error('Pas de token Firebase');
    return firstValueFrom(this.http.post(`${this.API}/login`, { token }));
  }

  async signupBackend(fname: string, lname: string, password: string) {
    const token = await this.getIdToken();
    if (!token) throw new Error('Pas de token Firebase');

    return firstValueFrom(
      this.http.post(`${this.API}/signup`, {
        token,
        fname,
        lname,
        password,
      })
    );
  }
}
