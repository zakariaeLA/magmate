// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';  // Importation de AppRoutingModule
import { AppComponent } from './app.component';  // Composant principal
import { MarketplaceModule } from './marketplace/marketplace.module';  // Importation du module Marketplace
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
     HeaderComponent, FooterComponent, AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Ajoutez AppRoutingModule ici
    MarketplaceModule ,  // Assurez-vous que le module marketplace est importé
    HttpClientModule,
    FormsModule,
    HomeComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
