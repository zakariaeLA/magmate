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
import { ConnectionProfileService } from '../../../components/connection-profile/connection-profile.service';
import { firstValueFrom } from 'rxjs';
import { UserProfile } from '../../../components/connection-profile/connection-profile.model';

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
  /*zineb*/
  currentUserProfile!: UserProfile;
  ownerUserProfile!: UserProfile;
  requestStatus: string = 'not-sent';
  error: string | null = null;
  isLoadingConnection: boolean = false;
  currentRequestId: number | null = null;
  private statusCheckInterval: any;

  constructor(
    private productService: ProductService1,
    private commentService: CommentService,
    private reclamationService: ReclamationService,
    private route: ActivatedRoute,
    private authService: AuthService, // Injection de AuthService
    private router: Router ,// Injection de Router
    private cdr: ChangeDetectorRef,
     private connectionService: ConnectionProfileService,
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
  
  
/* zineb */

  ngOnDestroy() {
    if (this.statusCheckInterval) {
      clearInterval(this.statusCheckInterval);
    }
  }

  private loadStateFromStorage(ownerId: string) {
    const savedState = localStorage.getItem(`connectionState_${ownerId}`);
    if (savedState) {
      const state = JSON.parse(savedState);
      this.requestStatus = state.requestStatus;
      this.currentRequestId = state.currentRequestId;
    }
  }

  private saveStateToStorage(ownerId: string) {
    const state = {
      requestStatus: this.requestStatus,
      currentRequestId: this.currentRequestId
    };
    localStorage.setItem(`connectionState_${ownerId}`, JSON.stringify(state));
  }

  async checkRequestStatus(ownerId: string) {
    try {
      const response = await firstValueFrom(
        this.connectionService.getUserRequestStatus(ownerId)
      );
      
      if (this.requestStatus !== response.status) {
        this.requestStatus = response.status;
        this.saveStateToStorage(ownerId);
      }
      
      if (response.status === 'waiting-for-current-user-response') {
        await this.findCurrentRequestId(ownerId);
      }
    } catch (err) {
      console.error('Erreur lors de la vérification du statut:', err);
    }
  }

  async findCurrentRequestId(ownerId: string) {
    try {
      const requests = await firstValueFrom(
        this.connectionService.getReceivedRequests()
      );
      const request = requests.find(r => 
        r.creator.id === ownerId && 
        r.receiver.id === this.currentUserProfile.id
      );
      if (request && this.currentRequestId !== request.id) {
        this.currentRequestId = request.id;
        this.saveStateToStorage(ownerId);
      }
    } catch (err) {
      console.error('Erreur lors de la recherche de la demande:', err);
    }
  }

async contactSeller(): Promise<void> {
    console.log('[DEBUG] Début de contactSeller()');
    const ownerId = this.product?.magasin?.proprietaire?.id;
    console.log('[DEBUG] ID du propriétaire:', ownerId);

    if (!ownerId) {
        console.error('[ERROR] Propriétaire ID non trouvé');
        return;
    }

    this.isLoadingConnection = true;
    this.error = null;

    try {
        // 1. Charger l'état actuel
        this.loadStateFromStorage(ownerId);

        // 2. Récupérer les profils utilisateurs
        const currentUserId = await this.authService.getUserIdByToken();
        if (!currentUserId) {
            throw new Error("Impossible de récupérer l'utilisateur courant.");
        }

        const [currentProfile, ownerProfile] = await Promise.all([
            this.connectionService.getSpecificUserProfile(currentUserId),
            this.connectionService.getSpecificUserProfile(ownerId)
        ]);

        this.currentUserProfile = currentProfile;
        this.ownerUserProfile = ownerProfile;

        // 3. Vérifier le statut actuel
        await this.checkRequestStatus(ownerId);

        // 4. Logique de redirection
        if (this.requestStatus === 'accepted') {
            // Cas 1: Déjà connectés → redirection directe
            console.log('[DEBUG] Utilisateurs déjà connectés - redirection');
            this.router.navigate(['/messagerie'], {
                queryParams: { recipientId: ownerId }
            });
        } else if (this.requestStatus === 'pending' || 
                  this.requestStatus === 'waiting-for-current-user-response') {
            // Cas 2: Demande en attente → redirection quand même
            console.log('[DEBUG] Demande existante - redirection');
            this.router.navigate(['/messagerie'], {
                queryParams: { recipientId: ownerId }
            });
        } else if (this.requestStatus === 'not-sent') {
            // Cas 3: Aucune demande → création et acceptation automatique
            console.log('[DEBUG] Envoi nouvelle demande');
            const response = await firstValueFrom(
                this.connectionService.sendUserRequest(ownerId)
            );

            if (response && (response as any).error) {
                throw new Error((response as any).error);
            }

            await new Promise(resolve => setTimeout(resolve, 500));
            await this.acceptRequestAutomatically(ownerId);
            
            console.log('[DEBUG] Redirection après création demande');
            this.router.navigate(['/messagerie'], {
                queryParams: { recipientId: ownerId }
            });
        }

        this.startStatusChecking(ownerId);
    } catch (err: any) {
        console.error('[ERROR] Erreur complète:', err);
        this.error = err.message || "Échec de l'envoi de la demande";
    } finally {
        this.isLoadingConnection = false;
        this.cdr.detectChanges();
    }
}

private async acceptRequestAutomatically(ownerId: string) {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Délai explicite
  
  const requests = await firstValueFrom(
    this.connectionService.getReceivedRequests()
  );
  
  const request = requests.find(r => 
    r.creator.id === ownerId && // Note: inversion par rapport à votre code original
    r.receiver.id === this.currentUserProfile.id &&
    r.status === 'pending'
  );
  
  if (request) {
    await firstValueFrom(
      this.connectionService.respondToUserRequest(request.id, 'accepted')
    );
    this.requestStatus = 'accepted';
    this.saveStateToStorage(ownerId);
  }
}

  private startStatusChecking(ownerId: string) {
    if (this.statusCheckInterval) {
      clearInterval(this.statusCheckInterval);
    }
    
    this.statusCheckInterval = setInterval(async () => {
      await this.checkRequestStatus(ownerId);
      this.cdr.detectChanges(); // Forcer la détection des changements
    }, 10000); // Vérifier toutes les 10 secondes
  }

  getConnectionStatusMessage(): string {
    switch (this.requestStatus) {
      case 'not-sent': return 'Aucune demande envoyée';
      case 'pending': return 'Demande envoyée - En attente de réponse';
      case 'accepted': return 'Vous êtes connectés';
      case 'rejected': return 'Demande refusée';
      case 'waiting-for-current-user-response': 
        return 'Cet utilisateur vous a envoyé une demande';
      default: return 'Statut inconnu';
    }
  }

  
  
}
