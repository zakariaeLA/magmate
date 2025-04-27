import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import du FormsModule
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  // Assurez-vous d'importer ReactiveFormsModule
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductUpdateComponent } from './pages/product-update/product-update.component';
import { ProductCardComponent } from './components/product-card/product-card.component';  // Exemple d'autres composants
import { MagasinFormComponent } from './pages/magasin-form/magasin-form.component';
@NgModule({
  declarations: [
   
    ProductUpdateComponent,
    ProductCardComponent,
    ProductFormComponent,
    MagasinFormComponent,   // Assurez-vous que tous les composants nécessaires sont déclarés ici
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Importez le module de base pour les fonctionnalités Angular courantes
  ],
  exports: [
    
    ProductUpdateComponent, 
    ProductCardComponent,
    MagasinFormComponent,
    ProductFormComponent, // Exportez le composant pour qu'il soit accessible ailleurs
  ]
})
export class MarketplaceModule {}
