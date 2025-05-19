import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TranslationCurrencyComponent } from './components/translation-currency/translation-currency.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductDetailsComponent } from './marketplace/pages/product-details/product-details.component';
import { MarketplaceComponent } from './marketplace/pages/marketplacehome/marketplacehome.component';

import { AuthGuard } from './auth/guards/auth.guard';
import { MessagerieComponent } from './components/messagerie/messagerie.component';

import{MagasinFormComponent} from './marketplace/pages/magasin-form/magasin-form.component';
import { ProductFormComponent } from './marketplace/pages/product-form/product-form.component';
import { ProductUpdateComponent } from './marketplace/pages/product-update/product-update.component';
import { ConnectionProfileComponent } from './components/connection-profile/connection-profile.component';
import { ConnectionSendComponent } from './components/connection-send/connection-send.component';
import { ConnectionRequestsComponent } from './components/connection-requests/connection-requests.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'translation-currency', component: TranslationCurrencyComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'connectionProfile', component: ConnectionProfileComponent },
  // Marketplace routes
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  
  // Wildcard : { path: '**', redirectTo: '/login' },
  { path: 'messagerie', component: MessagerieComponent, canActivate: [AuthGuard] },
  
    { path: 'product-form', component: ProductFormComponent },
    { path: 'product-update/:id', component: ProductUpdateComponent  },
    { path: 'magasin-form', component: MagasinFormComponent },
  //  { path: 'magasin/:id', component: MagasinPageComponent },
    {path :'creer-magasin',component: MagasinFormComponent},
    {
      path: 'produit/:id',
      component: ProductDetailsComponent,
    },

    { 
      path: 'send-connection', 
      component: ConnectionSendComponent,
      
    },
    { 
      path: 'connection-requests', 
      component: ConnectionRequestsComponent,
      
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
