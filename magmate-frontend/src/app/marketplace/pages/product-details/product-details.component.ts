import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService1 } from '../../services/product1.service';
import { CommentService } from '../../services/comment.service';
import { ReclamationService } from '../../services/reclamation.service';
import { Produit } from '../../models/produit.model';
import { CreateReclamationDto } from '../../dto/create-reclamation.dto';
import { Avis } from '../../models/avis.model';
import { CreateAvisDto } from '../../dto/create-avis.dto';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router'; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ChangeDetectorRef } from '@angular/core';



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

  reclamationData: CreateReclamationDto = {
    idCible: 0,  // Initialisation à 0, sera mis à jour avec l'ID du produit lors de la soumission
    description: '',
    pieceJointe: '',  
    email: '', 
     
  };

  constructor(
    private productService: ProductService1,
    private commentService: CommentService,
    private reclamationService: ReclamationService,
    private route: ActivatedRoute,
    private authService: AuthService, // Injection de AuthService
    private router: Router ,// Injection de Router
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    
    // Vérifiez si l'utilisateur est connecté
    this.authService.getIdToken().then((token) => {
      if (token) {
        // Si l'utilisateur est connecté, continuez le chargement des produits
        if (this.productId) {
          this.loadProductDetails();
          this.loadComments();
        }
      } else {
        // Si l'utilisateur n'est pas connecté, rediriger vers la page de login
        this.router.navigate(['/login']);
      }
    });
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
      this.product.imagePrincipale = 'http://localhost:3000/public/images/' + thumbnailImage.imageURL;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.reclamationData.pieceJointe = file.name;
    }
  }

  async addReclamation() {
    if (this.reclamationData.description) {
      try {
        const token = await this.authService.getIdToken();
  
        if (!token) {
          console.error('Utilisateur non authentifié');
          return;
        }
  
        const user = firebase.auth().currentUser;
        const userEmail = user ? user.email : '';  // Récupérer l'email de l'utilisateur
  
        if (!userEmail) {
          console.error('Email utilisateur non trouvé');
          return;
        }
  
        const newReclamationData: CreateReclamationDto = {
          description: this.reclamationData.description,
          idCible: this.productId,  // L'ID du produit concerné
          pieceJointe: this.reclamationData.pieceJointe,
          email: userEmail,  // Envoyer l'email de l'utilisateur
        };
  
        // Appeler le service pour ajouter la réclamation
        this.reclamationService.addReclamation(this.productId, newReclamationData).subscribe(
          (newReclamation: any) => {
            console.log('Nouvelle réclamation ajoutée:', newReclamation);
            
         
            this.reclamationData.description = '';
            this.reclamationData.pieceJointe = '';
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la réclamation', error);
          }
        );
      } catch (error) {
        console.error('Erreur lors de la récupération du token:', error);
      }
    } else {
      alert('Veuillez entrer une description pour la réclamation.');
    }
  }
  

  async addComment() {
    if (this.newComment && this.rating > 0) {
      try {
        const token = await this.authService.getIdToken();
  
        if (!token) {
          console.error('Utilisateur non authentifié');
          return;
        }
  
        const user = firebase.auth().currentUser;
        const userEmail = user ? user.email : '';  // Récupérer l'email de l'utilisateur
  
        if (!userEmail) {
          console.error('Email utilisateur non trouvé');
          return;
        }
  
        const newCommentData: CreateAvisDto = {
          commentaire: this.newComment,
          note: this.rating,
          idProduit: this.productId,
          email: userEmail,  // Envoyer l'email de l'utilisateur
        };
  
        // Appeler le service pour ajouter le commentaire
        this.commentService.addComment(this.productId, newCommentData).subscribe(
          (newComment: Avis) => {
            console.log('Nouveau commentaire ajouté:', newComment);
           
            this.comments.push(newComment);
            
            
            this.newComment = '';
            this.rating = 0;
            this.loadComments();
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du commentaire', error);
          }
        );
      } catch (error) {
        console.error('Erreur lors de la récupération du token:', error);
      }
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
