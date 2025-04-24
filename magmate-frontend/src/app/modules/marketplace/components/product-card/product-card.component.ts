import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone:false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: any;  // Le produit qui sera passé depuis le parent
  showButtons: boolean = false;  // Pour afficher les boutons

  // Méthode pour vérifier si le produit est nouveau
  isNewProduct(dateAjout: string): boolean {
    const today = new Date();
    const addedDate = new Date(dateAjout);
    const diffInDays = (today.getTime() - addedDate.getTime()) / (1000 * 3600 * 24);
    return diffInDays <= 30;  // Si l'ajout est récent (moins de 30 jours)
  }

  // Méthodes pour supprimer et modifier un produit
  onEditProduct(productId: number) {
    console.log(`Modifier le produit avec l'ID: ${productId}`);
    // Logique de modification, comme la redirection vers un formulaire de modification
  }

  onDeleteProduct(productId: number) {
    console.log(`Supprimer le produit avec l'ID: ${productId}`);
    // Logique de suppression, comme un appel API pour supprimer le produit
  }
}
