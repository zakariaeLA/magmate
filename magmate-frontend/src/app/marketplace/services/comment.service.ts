


// src/app/marketplace/services/comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'c:/magmate/magmate-frontend/src/environments/environment'; // URL de base de l'API
import { Avis } from '../models/avis.model';  // Modèle pour les commentaires
import { CreateAvisDto } from '../dto/create-avis.dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = environment.apiUrl + '/comments';  // URL de base pour les commentaires

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les commentaires d'un produit
  getCommentsByProductId(productId: number): Observable<Avis[]> {
    return this.http.get<Avis[]>(`${this.apiUrl}/${productId}`);  // Appel GET pour récupérer les commentaires
  }

  // Méthode pour ajouter un commentaire
  addComment(productId: number, commentData: CreateAvisDto): Observable<Avis> {
    return this.http.post<Avis>(`${this.apiUrl}/${productId}`, commentData);  // Appel POST pour ajouter un commentaire
  }
}
