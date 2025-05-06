import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {PrestataireComponent } from './pages/prestataire.component';

@NgModule({
  declarations: [ PrestataireComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ PrestataireComponent]
})
export class PrestataireModule {}
