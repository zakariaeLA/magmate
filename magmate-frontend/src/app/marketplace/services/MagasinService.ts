// src/app/services/magasin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MagasinService {
  private baseUrl = 'http://localhost:3000/magasins'; // URL de base pour l'API

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer un magasin par userId
  getMagasinByUser(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`); // Appel à l'API backend
  }
  getMagasinById(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/magasins/${id}`);
  }

  deleteMagasin(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/magasins/${id}`);
  }
}
