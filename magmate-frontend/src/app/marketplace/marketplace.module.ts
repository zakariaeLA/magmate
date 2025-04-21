// src/app/marketplace/marketplace.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarketplaceRoutingModule } from './marketplace-routing.module'; // <-- tu l’as oublié dans le code

@NgModule({
  declarations: [
    ProductCardComponent,
    HomeComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MarketplaceRoutingModule 
  ],
  exports: [HomeComponent],
})
export class MarketplaceModule {}
