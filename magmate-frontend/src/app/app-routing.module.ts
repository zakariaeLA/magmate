
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core'; // Assurez-vous d'importer NgModule
import { RouterModule, Routes } from '@angular/router'; // Importation des modules de routage
//import { ProductDetailsComponent } from './marketplace/pages/product-details/product-details.component';  // Importation de votre composant de détails de produit
import { FormsModule } from '@angular/forms';
//import { MarketplaceComponent } from './marketplace/pages/marketplacehome/marketplacehome.component';

import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import{PrestataireDetailsComponent}from './prestataire/pages/prestatairedetails/prestataire-details.component';
import { AuthGuard } from './auth/guards/auth.guard';

//import { ProductDetailsComponent } from './marketplace/pages/product-details/product-details.component';  // Importation de votre composant de détails de produit

//import { MarketplaceComponent } from './marketplace/pages/marketplacehome/marketplacehome.component';


import { HomeComponent } from './components/home/home.component';
import { AccueilPrestataireComponent } from './prestataire/pages/accueil-prestataire/accueil-prestataire.component';

const routes: Routes = [

  //{ path: 'product/:id', component: ProductDetailsComponent },  // Route dynamique pour afficher les détails du produit
  { path: '', component: HomeComponent },
  //{ path: 'marketplace', component: MarketplaceComponent },
  { path: 'prestataires', component: AccueilPrestataireComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'prestataires/:uuid', component: PrestataireDetailsComponent },
  //{ path: 'product/:id', component: ProductDetailsComponent },  // Route dynamique pour afficher les détails du produit
  { path: '', component: HomeComponent },
  //{ path: 'marketplace', component: MarketplaceComponent },
  //{ path: '**', redirectTo: '/login' },

  // autres routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Utilisation de RouterModule pour la configuration des routes
  exports: [RouterModule], // Exporte le RouterModule pour l'utiliser dans l'application

})
export class AppRoutingModule {}
