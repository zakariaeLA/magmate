import { Component, OnInit } from '@angular/core';
import { ProductService, Produit } from '../../services/ProductService';
import { MagasinService } from '../../services/MagasinService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketplacehome',
  standalone: false,
  templateUrl: './marketplacehome.component.html',
  styleUrls: ['./marketplacehome.component.css'],
})
export class MarketplaceComponent implements OnInit {
  produits: Produit[] = [];
  search = '';
  selectedVille: string = '';
  villes: string[] = [
    'Casablanca',
    'Rabat',
    'Fès',
    'Marrakech',
    'Safi',
    'Tanger',
    'Essaouira',
    'Agadir',
    'Chefchaouen',
  ];
  magasin: any;
  message: string = ''; // ou récupérées dynamiquement
  showPopup:boolean=false;

  constructor(
    private productService: ProductService,
    private magasinService: MagasinService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    console.log('Recherche avec :', this.search, 'Ville :', this.selectedVille);

    this.productService.getProduits(this.search, this.selectedVille).subscribe(
      (data) => {
        console.log('Produits récupérés dans Angular:', data);
        this.produits = data;
      },
      (error) => {
        console.error('Erreur dans la récupération des produits :', error);
      }
    );
  }

  showMagasinPopup = false;

  openPopup() {
    const userId = 3; // Remplace par l'ID utilisateur réel, par exemple récupéré via un service d'authentification.

    this.magasinService.getMagasinByUser(userId).subscribe({
      next: (magasin) => {
        console.log('Magasin trouvé:', magasin);
        if (magasin) {
          if (magasin.estApprouve) {
            this.magasin = magasin;
            // Redirige vers la page du magasin
            this.router.navigate(['/magasin', magasin.idMagasin]);
          } else {
            this.message = 'Votre magasin est en cours de traitement.';
            this.showPopup = true;
          }
        } else {
          // Affiche le popup si aucun magasin n'est trouvé
          this.showMagasinPopup = true;
        }
      },
      error: (err) => {
        console.error('Erreur récupération magasin', err);
        this.showMagasinPopup = true; // Afficher le popup si une erreur se produit
      },
    });
  }
  closePopup() {
    this.showPopup = false;
  }



  scrollToProduits() {
    const produitsSection = document.querySelector('.search-bar');
    if (produitsSection) {
      produitsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  
}
