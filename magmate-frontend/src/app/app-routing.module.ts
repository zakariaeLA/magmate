// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';  // Assurez-vous d'importer NgModule
import { RouterModule, Routes } from '@angular/router';  // Importation des modules de routage
import { ProductDetailsComponent } from './marketplace/pages/product-details/product-details.component';  // Importation de votre composant de détails de produit
import { FormsModule } from '@angular/forms';


const routes: Routes = [

  { path: 'product/:id', component: ProductDetailsComponent },  // Route dynamique pour afficher les détails du produit
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Utilisation de RouterModule pour la configuration des routes
  exports: [RouterModule]  // Exporte le RouterModule pour l'utiliser dans l'application
})
export class AppRoutingModule { }  // Cette classe doit être annotée avec @NgModule
