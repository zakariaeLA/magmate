import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { HomeComponent } from './components/home/home.component';
// ... autres imports
import { TranslationCurrencyComponent } from './components/translation-currency/translation-currency.component';


const routes: Routes = [
  { path: 'translation-currency', component: TranslationCurrencyComponent },
  { path: '', component: HomeComponent },
  // autres routes...
];

=======
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' },
];
>>>>>>> 7aab6b9842cf285414087960d7c98d77ab7e61f0

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
<<<<<<< HEAD

export class AppRoutingModule { }

=======
export class AppRoutingModule {}
>>>>>>> 7aab6b9842cf285414087960d7c98d77ab7e61f0
