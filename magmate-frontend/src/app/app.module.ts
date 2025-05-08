import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module'; // Importation de AppRoutingModule
import { AppComponent } from './app.component'; // Composant principal
//import { MarketplaceModule } from './marketplace/marketplace.module';
//import { HomeComponent } from './components/home/home.component';
//import { HeaderComponent } from './components/header/header.component';
//import { FooterComponent } from './components/footer/footer.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/Interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { PrestataireModule } from './prestataire/prestataire.module';

@NgModule({
  declarations: [
   // HeaderComponent,
    //FooterComponent,
    AppComponent,


    LoginComponent,
   
    AuthComponent,
    SignupComponent,
    ResetPasswordComponent,
    ProfileComponent,
    AppComponent,
    
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    PrestataireModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
  ],



  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],


  bootstrap: [AppComponent],
})
export class AppModule {}
