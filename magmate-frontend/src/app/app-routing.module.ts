// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';  // Assurez-vous d'importer NgModule
import { RouterModule, Routes } from '@angular/router';  // Importation des modules de routage
import { ProductDetailsComponent } from './marketplace/pages/product-details/product-details.component';  // Importation de votre composant de détails de produit
import { FormsModule } from '@angular/forms';
import { MarketplaceComponent } from './marketplace/pages/marketplacehome/marketplacehome.component';

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  { path: 'product/:id', component: ProductDetailsComponent },  // Route dynamique pour afficher les détails du produit
  { path: '', component: HomeComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  
  // autres routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Utilisation de RouterModule pour la configuration des routes
  exports: [RouterModule]  // Exporte le RouterModule pour l'utiliser dans l'application
})
export class AppRoutingModule { }  // Cette classe doit être annotée avec @NgModule


