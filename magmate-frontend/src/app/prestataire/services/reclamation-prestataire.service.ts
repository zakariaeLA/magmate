import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateReclamationPrestataireDto } from '../dto/create-reclamation-prestataire.dto';

@Injectable({
  providedIn: 'root',
})
export class ReclamationPrestataireService {
  private baseUrl = 'http://localhost:3000/prestataires/reclamations';

  constructor(private http: HttpClient) {}

  addReclamation(idPrestataire: string, dto: CreateReclamationPrestataireDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/${idPrestataire}`, dto);
  }
}
