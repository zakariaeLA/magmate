import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PrestataireRoutingModule } from './prestataire-routing.module';
import { PrestataireDetailComponent } from './pages/prestataire-details.component';
import { PrestatairedetailsService } from './services/prestatairedetails.service';  // Service pour récupérer les détails du prestataire
import { HttpClientModule } from '@angular/common/http'; // Import de HttpClientModule pour les requêtes HTTP
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';  
import { AccueilPrestataireComponent } from './pages/accueil-prestataire/accueil-prestataire.component';
import { PrestataireCardComponent } from './components/prestataire-card/prestataire-card.component';


import { MonProfilPrestataireComponent } from './pages/mon-profil-prestataire/mon-profil-prestataire.component';

import {PrestataireComponent } from './pages/prestataire.component';
import { PrestataireUpdateComponent } from './pages/prestataire-update.component';

@NgModule({
  declarations: [
    AccueilPrestataireComponent,PrestataireCardComponent, MonProfilPrestataireComponent,PrestataireComponent ,PrestataireUpdateComponent
  ],
  imports: [
    PrestataireRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    AccueilPrestataireComponent ,PrestataireComponent,PrestataireUpdateComponent
  ]
})
export class PrestataireModule {}



