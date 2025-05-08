import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonProfilPrestataireComponent } from './pages/mon-profil-prestataire/mon-profil-prestataire.component';
import { PrestataireComponent } from './pages/prestataire.component';
import { PrestataireUpdateComponent } from './pages/prestataire-update.component';


const routes: Routes = [
   { path: 'monprofil' ,component:MonProfilPrestataireComponent},
   {path :'créer-profil', component:PrestataireComponent},
   {path :'modifier-profil', component:PrestataireUpdateComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Utilisation de `forChild` pour les modules enfants
  exports: [RouterModule],
})
export class PrestataireRoutingModule {}
