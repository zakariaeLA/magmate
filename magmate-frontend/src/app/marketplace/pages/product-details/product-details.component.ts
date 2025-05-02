// src/app/marketplace/pages/product-details/product-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService1 } from '../../services/product1.service';
import { CommentService } from '../../services/comment.service';
import { ReclamationService } from '../../services/reclamation.service';
import { Produit } from '../../models/produit.model';
import { CreateReclamationDto } from '../../dto/create-reclamation.dto';
import { Avis } from '../../models/avis.model';
import { CreateAvisDto } from '../../dto/create-avis.dto';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product!: Produit;
  comments: Avis[] = [];
  showReclamationForm: boolean = false;
  newComment: string = '';
  rating: number = 0;

  reclamationData: Partial<CreateReclamationDto> = {
    description: '',
    pieceJointe: '',
  };

  constructor(
    private productService: ProductService1,
    private commentService: CommentService,
    private reclamationService: ReclamationService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    if (this.productId) {
      this.loadProductDetails();
      this.loadComments();
    }
  }

  loadProductDetails() {
    this.productService.getProductById(this.productId).subscribe(
      (product: Produit) => {
        this.product = product;
        if (!this.product.imagePrincipale && this.product.images.length > 0) {
          this.product.imagePrincipale = this.product.images[0].imageURL;
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du produit', error);
      }
    );
  }

  loadComments() {
    this.commentService.getCommentsByProductId(this.productId).subscribe(
      (comments: Avis[]) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commentaires', error);
      }
    );
  }

  selectImage(thumbnailImage: { imageURL: string }): void {
    if (this.product) {
      this.product.imagePrincipale = thumbnailImage.imageURL;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.reclamationData.pieceJointe = file.name;
    }
  }

  submitReclamation() {
    if (this.reclamationData.description) {
      const reclamation: CreateReclamationDto = {
        idCible: this.productId,  // ✅ important
        description: this.reclamationData.description!,
        pieceJointe: this.reclamationData.pieceJointe!,
        idUtilisateur: ""// ➔ Peu importe ici, car on ne l'utilisera pas côté backend
      };

      this.reclamationService.addReclamation(this.productId, reclamation).subscribe(
        (response) => {
          console.log('Réclamation envoyée', response);
          this.showReclamationForm = false;
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de la réclamation', error);
        }
      );
    }
  }

  addComment() {
    if (this.newComment && this.rating) {
      const newCommentData: CreateAvisDto = {
        commentaire: this.newComment,
        note: this.rating,
        idProduit: this.productId,
        idUtilisateur: "0 "// ➔ Pareil ici, backend utilisera l'utilisateur connecté
      };

      this.commentService.addComment(this.productId, newCommentData).subscribe(
        (newComment: Avis) => {
          console.log('Nouveau commentaire ajouté:', newComment);
          this.comments.push(newComment);
          this.newComment = '';
          this.rating = 0;
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du commentaire', error);
        }
      );
    } else {
      alert('Veuillez entrer un commentaire et une note.');
    }
  }

  setRating(star: number) {
    this.rating = star;
  }

  closeReclamationForm() {
    this.showReclamationForm = false;
  }

  contactSeller() {
    console.log('Formulaire de contact du vendeur');
  }
}
