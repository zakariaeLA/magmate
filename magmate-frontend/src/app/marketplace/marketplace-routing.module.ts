import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: 'creer-magasin', component: CreateMagasinFormComponent },
  // ... autres routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // ou forChild si module enfant
  exports: [RouterModule]
})
export class MarketplaceRoutingModule {}
