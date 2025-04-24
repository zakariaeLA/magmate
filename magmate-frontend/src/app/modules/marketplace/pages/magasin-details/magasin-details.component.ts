import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MagasinService } from '../../services/magasin.service';
import { Router } from '@angular/router';  // Pour la redirection

@Component({
  selector: 'app-magasin-details',
  standalone:false,
  templateUrl: './magasin-details.component.html',
  styleUrls: ['./magasin-details.component.scss']
})
export class MagasinDetailsComponent implements OnInit {
  magasin: any;
  magasinId!: number;
  products: any[] = [];

  constructor(
    private magasinService: MagasinService,
    private route: ActivatedRoute,
    private router: Router // Injection du Router pour la redirection
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.magasinId = +params['id'];  // Récupérer l'ID du magasin depuis l'URL
      this.magasinService.getStoreDetails(this.magasinId).subscribe(
        magasin => {
          this.magasin = magasin;
          this.products = magasin.produits || []; // Charger les produits du magasin
        },
        error => {
          console.error('Erreur lors de la récupération des détails du magasin:', error);
        }
      );
    });
  }

  // Méthode pour rediriger vers la page d'ajout de produit
  onAddProduct() {
    this.router.navigate(['/product-form']);  // Rediriger vers la route d'ajout de produit
  }

  // Méthode pour éditer un produit
  onEditProduct(productId: number) {
    console.log(`Modifier le produit avec l'ID : ${productId}`);
    this.router.navigate(['/product-form', productId]);  // Rediriger vers le formulaire avec l'ID du produit
  }

  // Méthode pour supprimer un produit
  onDeleteProduct(productId: number) {
    console.log(`Supprimer le produit avec l'ID : ${productId}`);
    this.magasinService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter(product => product.idProduit !== productId);
    });
  }
}
