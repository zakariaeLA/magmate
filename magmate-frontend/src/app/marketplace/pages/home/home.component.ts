import { Component, OnInit } from '@angular/core';
import { ProductService, Produit } from '../../services/ProductService';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  produits: Produit[] = [];
  search = '';
  selectedVille: string = '';
  villes: string[] = ['Casablanca', 'Rabat', 'Fès', 'Marrakech','Safi','Tanger','Essaouira','Agadir','Chefchaouen']; // ou récupérées dynamiquement


  constructor(private productService: ProductService) {}

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
      this.showMagasinPopup = true;
    }
    

}
