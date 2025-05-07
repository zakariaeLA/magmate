import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {PrestataireComponent } from './pages/prestataire.component';
import { PrestataireUpdateComponent } from './pages/prestataire-update.component';

@NgModule({
  declarations: [ PrestataireComponent ,PrestataireUpdateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ PrestataireComponent,PrestataireUpdateComponent]
})
export class PrestataireModule {}
