// src/app/marketplace/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';  // URL de base de l'API
import { Produit } from '../models/produit.model'; 
@Injectable({
  providedIn: 'root'
})
export class ProductService1 {
  private apiUrl = environment.apiUrl + '/products';  // URL de base pour les produits

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer un produit par son ID
  getProductById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
}
}
