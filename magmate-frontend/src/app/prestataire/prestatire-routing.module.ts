import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonProfilPrestataireComponent } from './pages/mon-profil-prestataire/mon-profil-prestataire.component';


const routes: Routes = [
   { path: 'monprofil' ,component:MonProfilPrestataireComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Utilisation de `forChild` pour les modules enfants
  exports: [RouterModule],
})
export class PrestataireRoutingModule {}
