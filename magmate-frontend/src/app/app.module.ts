// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';  // Importation de AppRoutingModule
import { AppComponent } from './app.component';  // Composant principal
import { MarketplaceModule } from './marketplace/marketplace.module';  // Importation du module Marketplace
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Ajoutez AppRoutingModule ici
    MarketplaceModule ,  // Assurez-vous que le module marketplace est importé
    HttpClientModule,
    FormsModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
