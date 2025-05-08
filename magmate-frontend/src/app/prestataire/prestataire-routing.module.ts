import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrestataireDetailComponent } from './pages/prestataire-details.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'uuid/:uuid', component: PrestataireDetailComponent },
  { path: 'email/:email', component: PrestataireDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule]
})
export class PrestataireRoutingModule { }
