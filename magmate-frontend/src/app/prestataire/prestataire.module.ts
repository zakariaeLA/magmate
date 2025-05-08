import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestataireRoutingModule } from './prestataire-routing.module';
import { PrestataireDetailComponent } from './pages/prestataire-details.component';
import { PrestataireService } from './services/prestatairedetails.service';  // Service pour récupérer les détails du prestataire
import { HttpClientModule } from '@angular/common/http'; // Import de HttpClientModule pour les requêtes HTTP
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
     // Déclaration du composant de détails du prestataire
  ],
  imports: [
    FormsModule,
    CommonModule,
    PrestataireRoutingModule,
    HttpClientModule // Assurez-vous d'importer HttpClientModule pour effectuer des requêtes HTTP
  ],
  providers: [PrestataireService], // Déclarer PrestataireService pour l'injection de dépendance
})
export class PrestataireModule { }
