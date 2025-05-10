import { Component, OnInit } from '@angular/core';
import { ProductService, Produit } from '../../services/ProductService';
import { MagasinService } from '../../services/MagasinService';
import { AuthService } from '../../../auth/auth.service';
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
  message: string = '';
  showPopup: boolean = false;
  showMagasinPopup: boolean = false;

  userId: string | null = null;  // ID de l'utilisateur

  constructor(
    private productService: ProductService,
    private magasinService: MagasinService,
    private authService: AuthService,  // Injection du service AuthService
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadProduits();  // Charger les produits sans vérifier l'authentification au début
  }

  // Charger les produits du marketplace
  loadProduits(): void {
    console.log('Recherche avec :', this.search, 'Ville :', this.selectedVille);

    this.productService.getProduits(this.search, this.selectedVille).subscribe(
      (data) => {
        console.log('Produits récupérés:', data);
        this.produits = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    );
  }

 // Vérification de l'utilisateur connecté avant de permettre l'action
checkUserAuthentication(action: string, produitId?: number): void {
  this.authService.getIdToken().then((token) => {
    if (token) {
      // Si un token est présent, l'utilisateur est connecté
      this.userId = token;  // Vous pouvez également récupérer l'ID de l'utilisateur à partir du token

      if (action === 'monMagasin') {
        this.openStorePopup();  // Ouvrir le popup du magasin
      } else if (action === 'voirDetails' && produitId) {
        // Si l'utilisateur est connecté, rediriger vers la page de détails du produit
        this.router.navigate(['/product-details', produitId]);  
      }
    } else {
      // Si aucun token, rediriger vers la page de login pour la connexion
      this.router.navigate(['/login']);  
    }
  });
}

  
  // Ouvrir le popup pour afficher le magasin
  openStorePopup() {
    const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
  
    if (!userString) {
      this.router.navigate(['/login']);
      return;
    }
  
    const user = JSON.parse(userString);
    const email = user.email;
  
    this.magasinService.getUuidByEmail(email).subscribe({
      next: (response) => {
        const userId = response.uuid; 
        console.log(userId);// ou response.id selon ton backend
  
        this.magasinService.getMagasinByUser(userId).subscribe({
          next: (magasin) => {
            if (magasin) {
              if (magasin.estApprouve) {
                this.router.navigate(['/magasin', magasin.idMagasin]);
              } else {
                this.message = 'Votre magasin est en cours de traitement.';
                this.showPopup = true;
              }
            } else {
              this.message = 'Vous n\'avez pas encore de magasin. Veuillez en créer un.';
              this.showMagasinPopup = true;
            }
          },
          error: (err) => {
            console.error('Erreur récupération magasin', err);
            this.showMagasinPopup = true;
          },
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'UUID :', err);
      }
    });
  }
  

  // Fermer le popup
  closePopup() {
    this.showPopup = false;
  }

  // Méthode pour faire défiler la page vers la section des produits
  scrollToProduits() {
    const produitsSection = document.querySelector('.search-bar');
    if (produitsSection) {
      produitsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Méthode pour voir les détails d'un produit
voirDetails(produitId: number): void {
  this.authService.getIdToken().then((token) => {
    if (token) {
      // Si l'utilisateur est connecté, rediriger vers la page de détails du produit
      console.log('Utilisateur connecté, redirection vers product-details');
      this.router.navigate(['/product-details', produitId]);
    } else {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de login
      console.log('Utilisateur non connecté, redirection vers login');
      this.router.navigate(['/login']);
    }
  });
}

  
  
}
