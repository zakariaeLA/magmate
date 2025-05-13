import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrestataireDetailsComponent } from './pages/prestatairedetails/prestataire-details.component';
import { FormsModule } from '@angular/forms';
import { MonProfilPrestataireComponent } from './pages/mon-profil-prestataire/mon-profil-prestataire.component';
import { PrestataireComponent } from './pages/prestatairecomponent/prestataire.component';
import { PrestataireUpdateComponent } from './pages/prestataire-update/prestataire-update.component';



const routes: Routes = [
  {path :'prestataires/:uuid', component:PrestataireDetailsComponent},
  { path: 'monprofil' ,component:MonProfilPrestataireComponent},
  {path :'créer-profil', component:PrestataireComponent},
  {path :'modifier-profil', component:PrestataireUpdateComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule]
})
export class PrestataireRoutingModule { }



