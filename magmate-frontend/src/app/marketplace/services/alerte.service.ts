import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<{ message: string, type: 'success' | 'error' }>(); // Type correct de l'objet
  alert$ = this.alertSubject.asObservable();

  // Fonction pour afficher une alerte de succès
  success(message: string) {
    this.alertSubject.next({ message, type: 'success' });
  }

  // Fonction pour afficher une alerte d'erreur
  error(message: string) {
    this.alertSubject.next({ message, type: 'error' });
  }
}
