import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestataire-card',
  standalone:false,
  templateUrl: './prestataire-card.component.html',
  styleUrls: ['./prestataire-card.component.css'],
})
export class PrestataireCardComponent {
  @Input() prestataire: any;

  constructor(private router: Router) {}

  voirDetails(idPrestataire: number) {
    const isConnected =
      !!localStorage.getItem('user') || !!sessionStorage.getItem('user');

    if (isConnected) {
      this.router.navigate(['/']); //ici doit rediriger vers détails 
    } else {
      this.router.navigate(['/login']);
    }
  }

 
}
