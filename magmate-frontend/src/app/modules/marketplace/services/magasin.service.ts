import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagasinService {
  private apiUrl = 'http://localhost:3000/magasins'; // URL de l'API, assurez-vous qu'elle est correcte
  private productUrl = 'http://localhost:3000/products'; // URL pour les produits

  constructor(private http: HttpClient) {}

  // Méthode pour créer un magasin
  createMagasin(magasinData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, magasinData);
  }

  // Méthode pour récupérer les détails du magasin
  getStoreDetails(magasinId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${magasinId}`);
  }

  // Méthode pour supprimer un produit
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.productUrl}/${productId}`);
  }
}
