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
    pieceJointe: '',  // Nom du fichier ou lien de la pièce jointe
    id: '', // ID de l'utilisateur, à remplir lors de la soumission
  };

  constructor(
    private productService: ProductService1,
    private commentService: CommentService,
    private reclamationService: ReclamationService,
    private route: ActivatedRoute,
    private authService: AuthService, // Injection de AuthService
    private router: Router // Injection de Router
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

  submitReclamation() {
    if (this.reclamationData.description) {
      // Récupérer le token de l'utilisateur pour obtenir l'ID
      this.authService.getIdToken().then((token) => {
        if (token) {
          // Remplir idUtilisateur avec le token de l'utilisateur
          this.reclamationData.id = token;
  
          // Mettre à jour idCible avec l'ID du produit (idProduit)
          this.reclamationData.idCible = this.productId;  // `productId` doit être défini et correspondre au produit concerné
  
          // Créer la réclamation avec les données
          const reclamation: CreateReclamationDto = {
            idCible: this.reclamationData.idCible,  // ID du produit concerné (idProduit)
            description: this.reclamationData.description!,  // Description de la réclamation
            pieceJointe: this.reclamationData.pieceJointe!,  // Pièce jointe (nom du fichier ou URL)
            id: this.reclamationData.id!,  // ID de l'utilisateur (token)
          };
  
          // Soumettre la réclamation via le service
          this.reclamationService.addReclamation(this.productId, reclamation).subscribe(
            (response) => {
              console.log('Réclamation envoyée', response);
              this.showReclamationForm = false;  // Fermer le formulaire après soumission
            },
            (error) => {
              console.error('Erreur lors de l\'envoi de la réclamation', error);
            }
          );
        } else {
          // Si aucun token, rediriger vers la page de login
          this.router.navigate(['/login']);
        }
      }).catch((error) => {
        console.error('Erreur lors de la récupération du token:', error);
        this.router.navigate(['/login']);  // Rediriger si le token n'est pas récupéré
      });
    } else {
      alert('Veuillez entrer une description pour la réclamation.');
    }
  }

  async addComment() {
    console.log('Commentaire:', this.newComment);
    console.log('Note:', this.rating);
  
    if (this.newComment && this.rating) {
      try {
        // Récupérer le token de l'utilisateur pour extraire l'ID
        const token = await this.authService.getIdToken();
  
        // Vérifier que le token n'est pas null
        if (!token) {
          console.error('Utilisateur non authentifié');
          return; // Si le token est null, on arrête l'exécution
        }
  
        // Décoder le token pour obtenir l'ID utilisateur (UUID)
        const decoded = this.decodeJWT(token);  // Méthode de décodage à ajouter ci-dessous
        const userId = decoded.sub;  // ID utilisateur (UUID) extrait du token
  
        if (!userId) {
          console.error('ID utilisateur non trouvé');
          return; // Si l'ID utilisateur est introuvable, on arrête l'exécution
        }
  
        // Créer un objet de données de commentaire avec l'ID utilisateur récupéré
        const newCommentData: CreateAvisDto = {
          commentaire: this.newComment,
          note: this.rating,
          idProduit: this.productId,
          id: userId,  // Utiliser l'ID de l'utilisateur récupéré du token
        };
  
        // Appeler le service pour ajouter le commentaire
        this.commentService.addComment(this.productId, newCommentData).subscribe(
          (newComment: Avis) => {
            console.log('Nouveau commentaire ajouté:', newComment);
            this.comments.push(newComment);  // Ajouter le nouveau commentaire à la liste
            this.newComment = '';  // Réinitialiser le champ commentaire
            this.rating = 0;  // Réinitialiser la note
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
  
  // Méthode pour décoder le token JWT et récupérer l'ID utilisateur
  decodeJWT(token: string) {
    const base64Url = token.split('.')[1];  // Le payload est la deuxième partie du JWT
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''));
  
    return JSON.parse(jsonPayload);  // Retourner le payload décodé
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
