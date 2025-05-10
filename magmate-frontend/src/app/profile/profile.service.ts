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
    return firstValueFrom(this.http.patch(`${this.API}/update-photo`, photoData));
  }
  
  

}