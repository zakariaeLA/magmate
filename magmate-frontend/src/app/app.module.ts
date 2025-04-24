import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';  // Assurez-vous d'importer ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketplaceModule } from './modules/marketplace/marketplace.module'; // Importer le module Marketplace

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MarketplaceModule // Importez MarketplaceModule ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
