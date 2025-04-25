import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MagasinPageComponent } from './pages/magasin-page/magasin-page.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

const routes: Routes = [
  //{ path: 'creer-magasin', component: CreateMagasinFormComponent },
  // ... autres routes
  { path: 'magasin/:id', component: MagasinPageComponent },
  {
    path: 'produit/:id',
    component: ProductDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Utilisation de `forChild` pour les modules enfants
  exports: [RouterModule],
})
export class MarketplaceRoutingModule {}
