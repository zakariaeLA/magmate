import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Prestataire {
  idPrestataire: string;
  specialite: string;
  experience: string;
  localisation: string;
  telephone: string;
  ville: string;
  disponibilite: boolean;
  estApprouve: boolean;
  idUtilisateur: string;
  utilisateur: {
    email: string;
    fname: string;
    lname: string;
    photo: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PrestataireService {
  private baseUrl = 'http://localhost:3000/prestataires';

  constructor(private http: HttpClient) {}

  /**
   * Récupérer le prestataire par UUID
   */
  getPrestataireByUuid(uuid: string): Observable<Prestataire> {
    return this.http.get<Prestataire>(`${this.baseUrl}/uuid/${uuid}`);
  }

  /**
   * Récupérer le prestataire par email
   */
  getPrestataireByEmail(email: string): Observable<Prestataire> {
    return this.http.get<Prestataire>(`${this.baseUrl}/email/${email}`);
  }
}
