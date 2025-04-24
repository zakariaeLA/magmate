import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Utilisation de `forChild` pour les modules enfants
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
