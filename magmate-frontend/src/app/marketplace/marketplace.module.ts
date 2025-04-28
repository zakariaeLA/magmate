import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { ProductCardComponent } from './components/product-card/product-card.component'; 
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { MarketplaceComponent } from './pages/marketplacehome/marketplacehome.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../components/header/header.component';
import { MagasinPageComponent } from './pages/magasin-page/magasin-page.component';

import { ReactiveFormsModule } from '@angular/forms';  

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductCardComponent,
    MarketplaceComponent,
    MagasinPageComponent,
  ],
  imports: [
    CommonModule,  
    MarketplaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MarketplaceRoutingModule,
  ],
  exports: [
    ProductDetailsComponent,
    MarketplaceComponent
  ]
})
export class MarketplaceModule {}


