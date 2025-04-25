import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { ProductCardComponent } from './components/product-card/product-card.component'; // Importation du CommonModule
//import { ReactiveFormsModule } from '@angular/forms';  // Importation de ReactiveFormsModule
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
/*import { ProductActionsComponent } from './components/product-actions/product-actions.component';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';*/
import { ReportFormComponent } from './components/report-form/report-form.component';
import { MarketplaceComponent } from './pages/marketplacehome/marketplacehome.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../components/header/header.component';
import { MagasinPageComponent } from './pages/magasin-page/magasin-page.component';

import { ReactiveFormsModule } from '@angular/forms';  

@NgModule({
  declarations: [
    ProductDetailsComponent,
    CommentListComponent,
    /*ProductActionsComponent,
    RatingStarsComponent,*/
    ReportFormComponent,
    ProductCardComponent,
    MarketplaceComponent,
    MagasinPageComponent,
  ],
  imports: [
    CommonModule,  // Nécessaire pour *ngIf et *ngFor
    MarketplaceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MarketplaceRoutingModule,// Nécessaire pour formGroup et les formulaires réactifs
  ],
  exports: [
    ProductDetailsComponent,
    CommentListComponent,
    /*ProductActionsComponent,
    RatingStarsComponent,*/
    ReportFormComponent,
    MarketplaceComponent
  ]
})
export class MarketplaceModule {}


