// src/app/marketplace/services/reclamation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'c:/magmate/magmate-frontend/src/environments/environment';  // URL de base de l'API
import { CreateReclamationDto } from '../dto/create-reclamation.dto';  // Modèle DTO pour la réclamation

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = environment.apiUrl + '/reclamations';  // URL de base pour les réclamations

  constructor(private http: HttpClient) {}

  // Méthode pour ajouter une réclamation pour un produit
  addReclamation(productId: number, reclamationData: CreateReclamationDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/${productId}`, reclamationData);  // Effectuer un appel POST
  }

 
}
