import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';  
import { AccueilPrestataireComponent } from './pages/accueil-prestataire/accueil-prestataire.component';
import { PrestataireCardComponent } from './components/prestataire-card/prestataire-card.component';
import { PrestataireRoutingModule } from './prestatire-routing.module';
import { MonProfilPrestataireComponent } from './pages/mon-profil-prestataire/mon-profil-prestataire.component';

@NgModule({
  declarations: [
    AccueilPrestataireComponent,PrestataireCardComponent, MonProfilPrestataireComponent,
  ],
  imports: [
    PrestataireRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    AccueilPrestataireComponent 
  ]
})
export class PrestataireModule {}


