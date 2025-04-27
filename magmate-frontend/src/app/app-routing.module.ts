import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// ... autres imports
import { TranslationCurrencyComponent } from './components/translation-currency/translation-currency.component';


const routes: Routes = [
  { path: 'translation-currency', component: TranslationCurrencyComponent },
  { path: '', component: HomeComponent },
  // autres routes...
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

