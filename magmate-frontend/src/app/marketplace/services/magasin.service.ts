import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service'; // Importez le AuthService

@Injectable({
  providedIn: 'root'
})
export class MagasinService {
  private apiUrl = 'http://localhost:3000/magasins';
  private productUrl = 'http://localhost:3000/produits';

  constructor(private http: HttpClient,private authService: AuthService) {}

  // Créer un magasin
// magasin.service.ts
createMagasin(magasinData: any): Observable<any> {
  return this.http.post(this.apiUrl, magasinData, {
    headers: {
      'Authorization': `Bearer ${this.authService.getIdToken()}`,
      'Content-Type': 'application/json'
    }
  });
}

// Dans magasin.service.ts
// Dans magasin.service.ts
getUserUUID(firebaseUid: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/user-uuid/${firebaseUid}`, {
    headers: {
      'Authorization': `Bearer ${this.authService.getIdToken()}`
    }
  });
}
  // Récupérer un magasin par son ID (version corrigée)
  getMagasinById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Récupérer un magasin par l'ID utilisateur
  getMagasinByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  // Mettre à jour un magasin
  updateMagasin(id: number, magasinData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, magasinData);
  }

  // Supprimer un magasin
  deleteMagasin(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Récupérer les produits d'un magasin
  getProduitsByMagasin(magasinId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${magasinId}/produits`);
    // Note: J'ai ajouté un "s" à "produit" pour correspondre à votre endpoint backend
  }
  // Supprimer un produit (conservé pour compatibilité)
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.productUrl}/${productId}`);
  }
}