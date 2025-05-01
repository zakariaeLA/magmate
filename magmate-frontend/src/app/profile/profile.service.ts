// profile.service.ts
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

// profile.service.ts
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private API = 'http://localhost:3000/profile';
  profileUpdated = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  getProfile(): Promise<any> {
    return firstValueFrom(this.http.get(this.API));
  }

  async updateProfilePhoto(photoData: FormData): Promise<any> {
    try {
      const result = await firstValueFrom(this.http.patch(`${this.API}/update-photo`, photoData));
      this.profileUpdated.emit(); // Émettre après une mise à jour réussie
      return result;
    } catch (error) {
      throw error;
    }
  }
}

/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private API = 'http://localhost:3000/profile';

  constructor(private http: HttpClient) {}

  

  getProfile(): Promise<any> {
    return firstValueFrom(this.http.get(this.API));
  }

  updateProfilePhoto(photoData: FormData): Promise<any> {
    return firstValueFrom(this.http.patch(${this.API}/update-photo, photoData));
  }
  
  

}
*/

