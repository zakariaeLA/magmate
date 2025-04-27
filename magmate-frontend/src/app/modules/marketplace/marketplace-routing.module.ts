import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './pages/product-form/product-form.component';

import { MagasinFormComponent } from './pages/magasin-form/magasin-form.component';

const routes: Routes = [
  { path: 'product-form', component: ProductFormComponent },
  { path: 'product-update/:59', component: ProductFormComponent },  // Ensure that the update route exists
  { path: 'magasin-form', component: MagasinFormComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
