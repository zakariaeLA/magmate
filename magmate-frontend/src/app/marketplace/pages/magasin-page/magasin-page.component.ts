import { Component, OnInit } from '@angular/core';
import { MagasinService } from '../../services/MagasinService';
import { ProductService } from '../../services/ProductService';
import { Router } from '@angular/router';
import { AuthService } from 'C:/magmate/magmate-frontend/src/app/auth/auth.service';

@Component({
  selector: 'app-magasin-page',
  standalone: false,
  templateUrl: './magasin-page.component.html',
  styleUrls: ['./magasin-page.component.css'],
})
export class MagasinPageComponent implements OnInit {
  magasin: any = null;
  produits: any[] = [];
  error: string = '';
  userId: string = '';  // Variable pour stocker l'ID de l'utilisateur connecté

  constructor(
    private magasinService: MagasinService,
    private produitService: ProductService,
    private router: Router,
    private authService: AuthService // Injection du service AuthService
  ) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est connecté
    this.authService.getIdToken().then((token) => {
      if (!token) {
        // Si aucun token n'est trouvé, rediriger vers la page de connexion
        this.router.navigate(['/login']);
        return;
      }

      // Si l'utilisateur est connecté, récupérer l'ID de l'utilisateur
      this.userId = token;
      // Charger les magasins et produits associés à l'utilisateur
      this.loadMagasin(token);
    }).catch((error) => {
      console.error('Erreur de récupération du token :', error);
      this.router.navigate(['/login']);  // Rediriger si le token n'est pas récupéré
    });
  }

  loadMagasin(token: string): void {
    this.magasinService.getMagasinByUser(token).subscribe(
      (data) => {
        console.log('Magasin récupéré:', data);  // Vérifiez ce qui est renvoyé
        this.magasin = data;
        if (!this.magasin) {
          this.error = 'Aucun magasin trouvé';
        } else {
          this.loadProduits();
        }
      },
      (error) => {
        console.error('Erreur récupération magasin:', error);
        this.error = 'Impossible de charger le magasin';
      }
    );
  }
  
  loadProduits(): void {
    if (!this.magasin?.idMagasin) return;

    this.produitService.getProduitsByMagasin(this.magasin.idMagasin).subscribe(
      (data) => {
        this.produits = data;
      },
      (error) => {
        console.error('Erreur chargement des produits:', error);
      }
    );
  }

  deleteMagasin(idMagasin: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce magasin ?')) {
      this.magasinService.deleteMagasin(idMagasin).subscribe(
        (response) => {
          console.log('Magasin supprimé avec succès', response);
          alert('Magasin supprimé avec succès.');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Erreur lors de la suppression du magasin', error);
          alert('Une erreur est survenue lors de la suppression du magasin.');
        }
      );
    }
  }

  deleteProduct(productId: number) {
    if (confirm('Es-tu sûr de vouloir supprimer ce produit ?')) {
      this.produitService.deleteProduct(productId).subscribe({
        next: () => {
          alert('Produit supprimé avec succès ✅');
          this.loadProduits(); // Recharge les produits
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du produit :', error);
          alert('Erreur lors de la suppression du produit ❌');
        }
      });
    }
  }
}
