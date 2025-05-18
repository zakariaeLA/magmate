import { Component, OnInit } from '@angular/core';
import { PrestataireService } from '../../services/prestataire.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-accueil-prestataire',
  standalone: false,
  templateUrl: './accueil-prestataire.component.html',
  styleUrls: ['./accueil-prestataire.component.css'],
})
export class AccueilPrestataireComponent implements OnInit {
  prestataires: any[] = [];
  selectedVille: string = '';
  selectedSpecialite: string = '';
  query: string = '';
  villes: string[] = [
    'Agadir',
    'Al Hoceima',
    'Asilah',
    'Azilal',
    'Azemmour',
    'Beni Mellal',
    'Berkane',
    'Berrechid',
    'Casablanca',
    'Chefchaouen',
    'Dakhla',
    'El Jadida',
    'Errachidia',
    'Essaouira',
    'Fès',
    'Figuig',
    'Guelmim',
    'Ifrane',
    'Kénitra',
    'Khemisset',
    'Khénifra',
    'Khouribga',
    'Laâyoune',
    'Larache',
    'Marrakech',
    'Martil',
    'Meknès',
    'Mohammedia',
    'Nador',
    'Ouarzazate',
    'Oujda',
    'Rabat',
    'Safi',
    'Salé',
    'Sefrou',
    'Settat',
    'Sidi Bennour',
    'Sidi Ifni',
    'Sidi Kacem',
    'Skhirat',
    'Tanger',
    'Tan-Tan',
    'Taounate',
    'Taroudant',
    'Taza',
    'Temara',
    'Tétouan',
    'Tinghir',
    'Tiznit',
  ];

  constructor(
    private prestataireService: PrestataireService,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.loadPrestataires(); // ✅ Affiche tous les prestataires au chargement
  }
  

  loadPrestataires() {
    this.prestataireService
      .getPrestataires(this.query, this.selectedVille)
      .subscribe({
        next: (data) => {
          this.prestataires = data;
          console.log('Prestataires chargés:', data);
        },
        error: (err) => {
          console.error('Erreur:', err);
          this.prestataires = []; // Si une erreur se produit, vider la liste
        },
      });
  }

  scrollToPrestataires() {
    const prestataireSection = document.querySelector('.search-bar');
    if (prestataireSection) {
      prestataireSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  // Fonction pour ouvrir le modal
  openModal() {
    const modal = document.getElementById('prestataireModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  // Fonction pour fermer le modal
  closeModal() {
    const modal = document.getElementById('prestataireModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }


  // Votre logique pour vérifier si l'utilisateur est un prestataire, etc.
  monprofil() {
    const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
  
    if (userString) {
      const user = JSON.parse(userString);
      const email = user.email;
  
      this.prestataireService.getUuidByEmail(email).subscribe({
        next: (response) => {
          const uuid = response.uuid;
          console.log('UUID depuis la BDD :', uuid);
  
          localStorage.setItem('uuid', uuid);
  
          // Récupérer les infos complètes du prestataire
          this.prestataireService.getByUuid(uuid).subscribe({
            next: (prestataire) => {
              if (prestataire) {
                if (prestataire.estApprouve) {
                  this.router.navigate(['/monprofil']);
                } else {
                  alert("Votre demande est en cours de traitement par l'administration.");
                }
              } else {
                this.openModal(); // Pas encore prestataire
              }
            },
            error: (err) => {
              console.error("Erreur lors de la récupération du prestataire :", err);
            }
          });
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l\'UUID :', err);
        }
      });
  
    } else {
      this.router.navigate(['/login']);
    }
  }
  get prestatairesApprouves() {
  return this.prestataires.filter(p => p.estApprouve);
}

  
}
 
