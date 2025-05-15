import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventsCreateComponent } from './events/events-create/events-create.component';
import { EventsDetailsComponent } from './events/events-details/events-details.compnent';
import { MyEventsComponent } from './events/my-events/my-events.component';
import { MyFavoritesComponent } from './events/my-favorites/my-favorites.component';
const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventsListComponent },
  {
    path: 'events/create',
    component: EventsCreateComponent,
    canActivate: [AuthGuard],
  },  { path: 'events/my', component: MyEventsComponent },
  {
    path: 'events/edit/:id',
    component: EventsCreateComponent,
    canActivate: [AuthGuard],
  },
  
  {
  path: 'events/my-favorites',
  component: MyFavoritesComponent, // Remplacez par le nom réel de votre composant favoris
  canActivate: [AuthGuard],
},
{ path: 'events/:id', component: EventsDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
