// auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, getIdToken, User } from '@angular/fire/auth';
import { user, authState } from 'rxfire/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) {}

  async getToken(): Promise<string | null> {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      return await getIdToken(currentUser);
    }
    return null;
  }
}
