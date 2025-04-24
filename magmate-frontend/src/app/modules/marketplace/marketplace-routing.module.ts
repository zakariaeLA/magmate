import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { MagasinDetailsComponent } from './pages/magasin-details/magasin-details.component';
import { MagasinFormComponent } from './pages/magasin-form/magasin-form.component';

const routes: Routes = [
  { path: 'product-form', component: ProductFormComponent },
  { path: 'magasin-form', component: MagasinFormComponent },
  { path: 'magasin-details/:id', component: MagasinDetailsComponent }, // Assurez-vous que cette route existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
