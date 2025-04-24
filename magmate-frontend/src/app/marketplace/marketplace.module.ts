// src/app/marketplace/marketplace.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MarketplaceComponent } from './pages/marketplacehome/marketplacehome.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { HeaderComponent } from '../components/header/header.component';
import { MagasinPageComponent } from './pages/magasin-page/magasin-page.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    MarketplaceComponent,
    MagasinPageComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MarketplaceRoutingModule,
  ],
  exports: [MarketplaceComponent],
})
export class MarketplaceModule {}
