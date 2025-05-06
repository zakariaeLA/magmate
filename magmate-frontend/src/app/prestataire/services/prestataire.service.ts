// ✅ prestataire.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CreatePrestataireDto {
  specialite: string;
  experience: string;
  localisation: string;
  telephone: string;
  ville: string;
  disponibilite?: boolean;
}

export interface UpdatePrestataireDto extends Partial<CreatePrestataireDto> {}

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
}

@Injectable({ providedIn: 'root' })
export class PrestataireService {
  private apiUrl = '/prestataire';

  constructor(private http: HttpClient) {}

  create(dto: CreatePrestataireDto): Observable<Prestataire> {
    return this.http.post<Prestataire>(this.apiUrl, dto);
  }

  getMe(): Observable<Prestataire> {
    return this.http.get<Prestataire>(`${this.apiUrl}/me`);
  }

  update(dto: UpdatePrestataireDto): Observable<Prestataire> {
    return this.http.put<Prestataire>(`${this.apiUrl}/me`, dto);
  }

  delete(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/me`);
  }
}
