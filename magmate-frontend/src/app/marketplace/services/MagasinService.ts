// src/app/services/magasin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MagasinService {
  private baseUrl = 'http://localhost:3000/magasins'; // URL de base pour l'API

  constructor(private http: HttpClient,
        
  ) {}

  // Méthode pour récupérer un magasin par userId
  getMagasinByUser(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`); // Appel à l'API backend
  }
  getMagasinById(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/magasins/${id}`);
  }

  deleteMagasin(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/magasins/${id}`);
  }
  getUuidByEmail(email: string): Observable<{ uuid: string }> {
    return this.http.get<{ uuid: string }>(`http://localhost:3000/user/uuid-by-email?email=${email}`);
  }
  
}