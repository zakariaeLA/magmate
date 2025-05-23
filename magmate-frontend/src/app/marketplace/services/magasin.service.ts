import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagasinService {
  private apiUrl = 'http://localhost:3000/magasins'; // URL de l'API, assurez-vous qu'elle est correcte
  private productUrl = 'http://localhost:3000/produits'; // URL pour les produits

  constructor(private http: HttpClient) {}

  // Méthode pour créer un magasin
// In your service:
createMagasin(magasinData: FormData): Observable<any> {
  // Afficher le contenu de FormData
  console.log("Contenu de FormData:");
  magasinData.forEach((value, key) => {
    console.log(key, value);
  });
  
  return this.http.post(`${this.apiUrl}`, magasinData);
}

// Récupérer un magasin par son ID
getMagasinById(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`);
  //return this.http.put(`${this.apiUrl}/59`, productData);
}

// Mettre à jour un magasin
updateMagasin(id: number, magasinData: FormData): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, magasinData);
}
  

  // Méthode pour supprimer un produit
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.productUrl}/${productId}`);
  }
  getUuidByEmail(email: string): Observable<{ uuid: string }> {
    return this.http.get<{ uuid: string }>(`http://localhost:3000/user/uuid-by-email?email=${email}`);
  }
}