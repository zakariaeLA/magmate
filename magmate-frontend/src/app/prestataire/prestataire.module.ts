import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';  
import { AccueilPrestataireComponent } from './pages/accueil-prestataire/accueil-prestataire.component';
import { PrestataireCardComponent } from './components/prestataire-card/prestataire-card.component';
import { PrestataireRoutingModule } from './prestataire-routing.module';
import { MonProfilPrestataireComponent } from './pages/mon-profil-prestataire/mon-profil-prestataire.component';

import {PrestataireComponent } from './pages/prestatairecomponent/prestataire.component';
import { PrestataireUpdateComponent } from './pages/prestataire-update/prestataire-update.component';
import { PrestataireDetailsComponent } from './pages/prestatairedetails/prestataire-details.component';

@NgModule({
  declarations: [
    AccueilPrestataireComponent,
    PrestataireCardComponent, 
    MonProfilPrestataireComponent,
    PrestataireComponent ,
    PrestataireUpdateComponent, 
    PrestataireDetailsComponent,
    

  ],
  imports: [
    PrestataireRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    AccueilPrestataireComponent ,PrestataireComponent,PrestataireUpdateComponent, PrestataireDetailsComponent
  ]
})
export class PrestataireModule {}



