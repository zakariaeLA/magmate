import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MagasinPageComponent } from './pages/magasin-page/magasin-page.component';
const routes: Routes = [
  //{ path: 'creer-magasin', component: CreateMagasinFormComponent },
  // ... autres routes
  { path: 'magasin/:id', component: MagasinPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // ou forChild si module enfant
  exports: [RouterModule]
})
export class MarketplaceRoutingModule {}
