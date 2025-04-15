import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/*import { SwiperModule } from 'swiper/angular';*/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
