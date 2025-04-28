// src/app/marketplace/pages/product-details/product-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService1 } from '../../services/product1.service';
import { CommentService } from '../../services/comment.service';
import { ReclamationService } from '../../services/reclamation.service';
import { Produit } from '../../models/produit.model';
import { CreateReclamationDto } from '../../dto/create-reclamation.dto'; 
import { Avis } from '../../models/avis.model'; // Utilisez le modèle Avis
import { CreateAvisDto } from '../../dto/create-avis.dto';

@Component({
  selector: 'app-product-details',
  standalone:false,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number ;  // L'ID du produit récupéré de l'URL
  product!: Produit;
  comments: Avis[] = [];
  showReclamationForm: boolean = false;
  newComment: string = ''; // Variable pour la saisie du commentaire
  rating: number = 0; // Étoiles pour l'évaluation
  
  reclamationData: CreateReclamationDto = {
    idCible: 2,
    description: '',
    pieceJointe: '', // Contient le nom du fichier ou l'URL de la pièce jointe
    idUtilisateur: 1, // L'ID de l'utilisateur (à ajuster)
    
     
  };


  constructor(
    private productService: ProductService1,
    private commentService: CommentService,
    private reclamationService: ReclamationService,
    private route: ActivatedRoute,  // Pour récupérer l'ID du produit de l'URL
    //private fb: FormBuilder  // Injecter FormBuilder pour créer le formulaire
  ) {}

  loadProductDetails() {
    this.productService.getProductById(this.productId).subscribe(
      (product: Produit) => {
        this.product = product; // Assigner le produit récupéré
        // Si aucune image principale n'est définie, définir la première image comme principale
        if (!this.product.imagePrincipale && this.product.images.length > 0) {
          this.product.imagePrincipale = this.product.images[0].imageURL;
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du produit', error);
      }
    );
  }
  

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;  // Récupérer l'ID du produit depuis l'URL
    if (this.productId) {
      this.loadProductDetails();  // Charger les détails du produit
      this.loadComments();        // Charger les commentaires
      
    }

}
selectImage(thumbnailImage: { imageURL: string }): void {
    if (this.product) {
      this.product.imagePrincipale = thumbnailImage.imageURL;  // Met à jour l'image principale
    }
  }


    
 // Méthode pour gérer la sélection de fichier
 onFileSelected(event: any) {
  const file = event.target.files[0];  // Récupérer le fichier sélectionné
  if (file) {
    
    this.reclamationData.pieceJointe = file.name;  // Ou utilisez l'URL de téléchargement du fichier
  }
}

  
   

 loadComments() {
  this.commentService.getCommentsByProductId(this.productId).subscribe(
    (comments: Avis[]) => {
      this.comments = comments; // Charger les commentaires
    },
    (error) => {
      console.error('Erreur lors de la récupération des commentaires', error);
    }
  );
}
 

    submitReclamation() {
    if (this.reclamationData.description) {
      const reclamation = {
        description: this.reclamationData.description,
        pieceJointe: this.reclamationData.pieceJointe,
        idCible: this.productId,
        idUtilisateur: 1, // Remplacer par l'ID de l'utilisateur connecté
      };

      this.reclamationService.addReclamation(this.productId, reclamation).subscribe(
        (response) => {
          console.log('Réclamation envoyée', response);
          this.showReclamationForm = false; // Fermer le formulaire après soumission
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de la réclamation', error);
        }
      );
    }
  }

    addComment() {
      console.log('Commentaire:', this.newComment);
      console.log('Note:', this.rating);
    
      if (this.newComment && this.rating) {
        const newCommentData: CreateAvisDto = {
          commentaire: this.newComment,
          note: this.rating,
          idProduit: this.productId,
          idUtilisateur: 1, // Remplacez par l'ID de l'utilisateur connecté
       
        };
    
        this.commentService.addComment(this.productId, newCommentData).subscribe(
          (newComment: Avis) => {
            
            console.log('Nouveau commentaire ajouté:', newComment);  // Log de la réponse
            this.comments.push(newComment); // Ajouter le nouveau commentaire
            this.newComment = '';           // Réinitialiser le champ commentaire
            this.rating = 0;                // Réinitialiser la note
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
    this.rating = star; // Met à jour la note en fonction de l'étoile cliquée
  }

  // Fermer le formulaire
  closeReclamationForm() {
    this.showReclamationForm = false;
  }
  
  
  contactSeller() {
    // Simuler une action ici, comme ouvrir un formulaire ou afficher un message
    console.log('Formulaire de contact du vendeur');
    // Vous pouvez également rediriger l'utilisateur vers un formulaire de contact réel si disponible.
  }
  
}
