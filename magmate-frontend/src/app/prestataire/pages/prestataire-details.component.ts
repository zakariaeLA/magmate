import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestatairedetailsService, Prestataire } from '../services/prestatairedetails.service';

@Component({
  selector: 'app-prestataire-detail',
  templateUrl: './prestataire-details.component.html',
  styleUrls: ['./prestataire-details.component.css'],
  standalone: false,
})
export class PrestataireDetailComponent implements OnInit {
  prestataire: Partial<Prestataire> = {};

  constructor(
    private route: ActivatedRoute,
    private prestataireService: PrestatairedetailsService
  ) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    const email = this.route.snapshot.paramMap.get('email');

    if (uuid) {
      this.prestataireService.getPrestataireByUuid(uuid).subscribe({
        next: (data) => {
          this.prestataire = data;
        },
        error: (err) => console.error('Erreur UUID :', err),
      });
    }

  }
}
