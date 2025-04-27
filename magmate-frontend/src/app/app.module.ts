import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { HttpClientModule } from '@angular/common/http'; // Ajoutez ceci
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component'; // Import manquant
import { TranslationCurrencyComponent } from './components/translation-currency/translation-currency.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    IonicModule.forRoot(), // Ajout d'IonicModule
    HttpClientModule,
    // SwiperModule si vous l'utilisez
    HomeComponent, // Ajouté ici
    

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ajouté pour supporter les web components
})
export class AppModule { }