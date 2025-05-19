import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.css']
})
export class ProductActionsComponent {
  @Input() product: any;  // Le produit est passé en entrée
  @Output() contactSeller = new EventEmitter<void>();  // Événement pour contacter le vendeur
  @Output() reportProduct = new EventEmitter<void>();  // Événement pour signaler le produit
  @Output() rateProduct = new EventEmitter<number>();  // Événement pour évaluer le produit

  constructor() {}

  // Fonction pour contacter le vendeur
  onContactSeller(): void {
    this.contactSeller.emit();  // Déclencher l'événement de contact avec le vendeur
  }

  // Fonction pour signaler le produit
  onReportProduct(): void {
    this.reportProduct.emit();  // Déclencher l'événement pour signaler le produit
  }

  // Fonction pour évaluer le produit
  onRateProduct(rating: number): void {
    this.rateProduct.emit(rating);  // Émettre l'évaluation du produit
  }
}
