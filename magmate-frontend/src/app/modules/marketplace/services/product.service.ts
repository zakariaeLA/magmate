import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `http://localhost:3000/produits`;

  constructor(private http: HttpClient) { }

  // Méthode pour créer un produit
  createProduct(product: FormData): Observable<any> {
    return this.http.post(this.apiUrl, product/*, {
      headers: {
        'Content-Type': 'multipart/form-data'  // Important pour l'upload de fichiers
      }
    }*/);
  }

  // Méthode pour récupérer la liste des magasins
  getMagasins(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/magasins`);
  }
  //méthode pour modifier un produit:
  updateProduct(id: number, productData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, productData);
  }
  

  // Méthode pour supprimer un produit
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}
