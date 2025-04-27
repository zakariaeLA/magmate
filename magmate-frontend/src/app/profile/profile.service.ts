import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAuth } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private API = 'http://localhost:3000/profile';

  constructor(private http: HttpClient) {}

  private async getIdToken(): Promise<string | null> {
    const user = getAuth().currentUser;
    return user ? await user.getIdToken() : null;
  }

  async getProfile(): Promise<any> {
    const token = await this.getIdToken();
    if (!token) throw new Error('Utilisateur non authentifié');

    return firstValueFrom(
      this.http.get(this.API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

 

  updateProfilePhoto(photoData: FormData) {
    const token = this.getIdToken(); 
    return firstValueFrom(
      this.http.patch(`${this.API}/update-photo`, photoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }
  
  

}
