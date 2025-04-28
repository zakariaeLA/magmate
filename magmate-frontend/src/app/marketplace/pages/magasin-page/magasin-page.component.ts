// src/app/components/magasin-page/magasin-page.component.ts

import { Component, OnInit } from '@angular/core';
import { MagasinService } from '../../services/MagasinService';
import { ProductService } from '../../services/ProductService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-magasin-page',
  standalone:false,
  templateUrl: './magasin-page.component.html',
  styleUrls: ['./magasin-page.component.css'],
})


export class MagasinPageComponent implements OnInit {

  magasin: any = null;
  produits: any[] = [];
  error: string = '';

  constructor(
    private magasinService: MagasinService,
    private produitService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = 1;

    this.magasinService.getMagasinByUser(userId).subscribe(
      (data) => {
        this.magasin = data;
        console.log('Magasin:', this.magasin);
        this.loadProduits();
      },
      (error) => {
        console.error('Erreur dans la récupération du magasin:', error);
        this.error = 'Impossible de charger le magasin';
      }
    );
  }

  loadProduits(): void {
    if (!this.magasin?.idMagasin) return;

    this.produitService.getProduitsByMagasin(this.magasin.idMagasin).subscribe(
      (data) => {
        this.produits = data;
        console.log('Produits:', this.produits);
      },
      (error) => {
        console.error('Erreur chargement des produits:', error);
      }
    );
  }
  
  
  
  deleteMagasin(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce magasin ?')) {
      this.magasinService.deleteMagasin(id).subscribe(
        (response) => {
          console.log('Magasin supprimé avec succès', response);
          alert('Magasin supprimé avec succès.');
          this.router.navigate(['/'])
          // Tu peux mettre à jour la liste des magasins ou faire une redirection ici
          
        },
        (error) => {
          console.error('Erreur lors de la suppression du magasin', error);
          alert('Une erreur est survenue lors de la suppression du magasin.');
        }
      );
    }
  }
  
  
}

