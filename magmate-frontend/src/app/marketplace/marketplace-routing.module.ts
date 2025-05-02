import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MagasinPageComponent } from './pages/magasin-page/magasin-page.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import{MagasinFormComponent} from './pages/magasin-form/magasin-form.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductUpdateComponent } from './pages/product-update/product-update.component';


const routes: Routes = [
  { path: 'product-form', component: ProductFormComponent },
  { path: 'product-update', component: ProductUpdateComponent  },
  { path: 'magasin-form', component: MagasinFormComponent },
  { path: 'magasin/:id', component: MagasinPageComponent },
  {path :'creer-magasin',component: MagasinFormComponent},
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
