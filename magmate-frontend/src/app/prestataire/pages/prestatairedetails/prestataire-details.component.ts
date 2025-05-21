import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestatairedetailsService } from '../../services/prestatairedetails.service';
import { CommentPrestataireService } from '../../services/comment-prestataire.service';
import { ReclamationPrestataireService } from '../../services/reclamation-prestataire.service';
import { CommentPrestataire } from '../../models/comment-prestataire.model';
import { Reclamationprestataire } from '../../models/reclamation-prestataire.model';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { CreateReclamationPrestataireDto } from '../../dto/create-reclamation-prestataire.dto';
import { AuthService } from '../../../auth/auth.service';
import { PrestataireService } from '../../services/prestataire.service';
import { Router } from '@angular/router';
import { ConnectionProfileService } from '../../../components/connection-profile/connection-profile.service';
import { firstValueFrom } from 'rxjs';
import { UserProfile } from '../../../components/connection-profile/connection-profile.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-prestataire-details',
  templateUrl: './prestataire-details.component.html',
  styleUrls: ['./prestataire-details.component.css'],
  standalone: false,
})
export class PrestataireDetailsComponent implements OnInit {
  prestataire: any = null;
  showReclamationForm: boolean = false;
  comments: CommentPrestataire[] = [];
  description: string = '';
  pieceJointe: string = '';
  idPrestataire: string = '';

  newComment: CreateCommentDto = {
    note: 0,
    commentaire: '',
    prestataireId: '',
    userId: '',
  };
  
  newReclamation: CreateReclamationPrestataireDto = {
    description: '',
    prestataireId: '',
    pieceJointe: ''
  };
  
  prestataireId: string | null = '';
  userId: string = '';
  loading: boolean = true;
  errorMessage: string = '';
  uuid: string | null = '';
  /* zineb */
    currentUserProfile!: UserProfile;
  prestataireUserProfile!: UserProfile;
  requestStatus: string = 'not-sent';
  connectionError: string | null = null;
  isLoadingConnection: boolean = false;
  currentRequestId: number | null = null;
  private statusCheckInterval: any;

  constructor(
    private route: ActivatedRoute,
    private prestataireService: PrestatairedetailsService,
    private commentService: CommentPrestataireService,
    private reclamationService: ReclamationPrestataireService,
    private authService: AuthService,
    private prestatireservice:PrestataireService,
    private router: Router,
     private connectionService: ConnectionProfileService,
  ) {}

  
ngOnInit(): void {
  this.uuid = this.route.snapshot.paramMap.get('uuid'); // UUID du prestataire dans l'URL
  const userString = localStorage.getItem('user') || sessionStorage.getItem('user');

  if (userString) {
    const user = JSON.parse(userString);
    const email = user.email;

    // Appel à l'API pour récupérer le UUID de l'utilisateur connecté
    this.prestatireservice.getUuidByEmail(email).subscribe({
      next: (response) => {
        this.userId = response.uuid;
        console.log('ID utilisateur connecté (pour le commentaire) :', this.userId);

        if (this.uuid) {
          this.prestataireId = this.uuid;
          this.newComment.prestataireId = this.uuid;
          this.newComment.userId = this.userId;

          this.getPrestataireDetails(this.uuid);
          this.loadComments(this.uuid);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'UUID de l\'utilisateur :', err);
        alert('Erreur lors de la récupération des informations utilisateur.');
      }
    });
  } else {
    this.router.navigate(['/login']);
  }
}



  /**
   * Récupérer les détails du prestataire
   */
  getPrestataireDetails(uuid: string): void {
  this.prestataireService.getPrestataireByUuid(uuid).subscribe({
    next: (data) => {
      this.prestataire = data;
      this.loading = false;

      // ⚠️ Vérifie que la relation "utilisateur" existe
      if (data.utilisateur && data.utilisateur.id) {
        const idUtilisateur = data.utilisateur.id;
        console.log('ID Utilisateur associé au prestataire :', idUtilisateur);
      }
    },
    error: (error) => {
      console.error('Erreur API :', error);
      this.errorMessage = 'Erreur lors de la récupération des informations.';
      this.loading = false;
    },
  });
}

  /**
   * Récupérer les commentaires du prestataire
   */
  loadComments(prestataireId: string): void {
    this.commentService.getComments(prestataireId).subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des commentaires :', err);
      },
    });
  }

  /**
   * Récupérer les réclamations du prestataire
   */
  /*loadReclamations(prestataireId: string): void {
    this.reclamationService.getReclamations(prestataireId).subscribe({
      next: (data) => {
        this.reclamations = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réclamations :', err);
      },
    });
  } */

  /**
   * Ajouter un commentaire
   */
  addComment(): void {
    if (!this.newComment.commentaire.trim()) {
      alert('Veuillez entrer un commentaire.');
      return;
    }

    this.commentService.addComment(this.newComment).subscribe({
      next: () => {
        this.loadComments(this.newComment.prestataireId);
        this.resetCommentForm();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du commentaire :', err);
      },
    });
  }

  /**
   * Réinitialiser le formulaire de commentaire
   */
  resetCommentForm(): void {
    this.newComment = {
      note: 0,
      commentaire: '',
      prestataireId: this.prestataireId || '',
      userId: this.userId,
    };
  }

  /**
   * Sélectionner le rating
   */
  setRating(star: number): void {
    this.newComment.note = star;
  }

  sendReclamation() {
    if (!this.prestataireId) {
      alert('Erreur : ID du prestataire non trouvé.');
      return;
    }
  
    // Assigner le prestataireId
    this.newReclamation.prestataireId = this.prestataireId;
  
    console.log('Données envoyées :', this.newReclamation);
  
    this.reclamationService.addReclamation(this.prestataireId, this.newReclamation).subscribe({
      next: (response) => {
        console.log('Réclamation envoyée :', response);
        alert('Réclamation envoyée avec succès');
        this.resetForm();
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi de la réclamation :', error);
        alert('Erreur lors de l\'envoi de la réclamation');
      }
    });
  }
  
  resetForm() {
    this.newReclamation = {
      description: '',
      prestataireId: '',
      pieceJointe: ''
    };
  }
  
   onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newReclamation.pieceJointe = file.name;
    }
  }

  
  closeReclamationModal() {
    this.showReclamationForm = false;
    this.resetForm();
  }
openReclamationModal() {  

    this.showReclamationForm = true;
  }

  
  async contactPrestataire(): Promise<void> {
    console.log('[DEBUG] Début de contactPrestataire()');
    const prestataireId = this.prestataire?.utilisateur?.id;
    console.log('[DEBUG] ID du prestataire:', prestataireId);

    if (!prestataireId) {
      console.error('[ERROR] ID prestataire non trouvé');
      return;
    }

    this.isLoadingConnection = true;
    this.connectionError = null;

    try {
      // 1. Charger l'état actuel
      this.loadStateFromStorage(prestataireId);

      // 2. Récupérer les profils utilisateurs
      const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (!userString) {
        throw new Error("Utilisateur non connecté");
      }
      
      const user = JSON.parse(userString);
      const email = user.email;

      const response = await lastValueFrom(this.prestatireservice.getUuidByEmail(email));
      const currentUserId = response.uuid;

      const [currentProfile, prestataireProfile] = await Promise.all([
        this.connectionService.getSpecificUserProfile(currentUserId),
        this.connectionService.getSpecificUserProfile(prestataireId)
      ]);

      this.currentUserProfile = currentProfile;
      this.prestataireUserProfile = prestataireProfile;

      // 3. Vérifier le statut actuel
      await this.checkRequestStatus(prestataireId);

      // 4. Logique de redirection
      if (this.requestStatus === 'accepted') {
        // Cas 1: Déjà connectés → redirection directe
        console.log('[DEBUG] Utilisateurs déjà connectés - redirection');
        this.router.navigate(['/messagerie'], {
          queryParams: { recipientId: prestataireId }
        });
      } else if (this.requestStatus === 'pending' || 
                this.requestStatus === 'waiting-for-current-user-response') {
        // Cas 2: Demande en attente → redirection quand même
        console.log('[DEBUG] Demande existante - redirection');
        this.router.navigate(['/messagerie'], {
          queryParams: { recipientId: prestataireId }
        });
      } else if (this.requestStatus === 'not-sent') {
        // Cas 3: Aucune demande → création et acceptation automatique
        console.log('[DEBUG] Envoi nouvelle demande');
        const response = await firstValueFrom(
          this.connectionService.sendUserRequest(prestataireId)
        );

        if (response && (response as any).error) {
          throw new Error((response as any).error);
        }

        await new Promise(resolve => setTimeout(resolve, 500));
        await this.acceptRequestAutomatically(prestataireId);
        
        console.log('[DEBUG] Redirection après création demande');
        this.router.navigate(['/messagerie'], {
          queryParams: { recipientId: prestataireId }
        });
      }

      this.startStatusChecking(prestataireId);
    } catch (err: any) {
      console.error('[ERROR] Erreur complète:', err);
      this.connectionError = err.message || "Échec de l'envoi de la demande";
    } finally {
      this.isLoadingConnection = false;
    }
  }

  private async acceptRequestAutomatically(prestataireId: string) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Délai explicite
    
    const requests = await firstValueFrom(
      this.connectionService.getReceivedRequests()
    );
    
    const request = requests.find(r => 
      r.creator.id === prestataireId &&
      r.receiver.id === this.currentUserProfile.id &&
      r.status === 'pending'
    );
    
    if (request) {
      await firstValueFrom(
        this.connectionService.respondToUserRequest(request.id, 'accepted')
      );
      this.requestStatus = 'accepted';
      this.saveStateToStorage(prestataireId);
    }
  }

  private loadStateFromStorage(prestataireId: string) {
    const savedState = localStorage.getItem(`connectionState_${prestataireId}`);
    if (savedState) {
      const state = JSON.parse(savedState);
      this.requestStatus = state.requestStatus;
      this.currentRequestId = state.currentRequestId;
    }
  }

  private saveStateToStorage(prestataireId: string) {
    const state = {
      requestStatus: this.requestStatus,
      currentRequestId: this.currentRequestId
    };
    localStorage.setItem(`connectionState_${prestataireId}`, JSON.stringify(state));
  }

  private async checkRequestStatus(prestataireId: string) {
    try {
      const response = await firstValueFrom(
        this.connectionService.getUserRequestStatus(prestataireId)
      );
      
      if (this.requestStatus !== response.status) {
        this.requestStatus = response.status;
        this.saveStateToStorage(prestataireId);
      }
      
      if (response.status === 'waiting-for-current-user-response') {
        await this.findCurrentRequestId(prestataireId);
      }
    } catch (err) {
      console.error('Erreur lors de la vérification du statut:', err);
    }
  }

  private async findCurrentRequestId(prestataireId: string) {
    try {
      const requests = await firstValueFrom(
        this.connectionService.getReceivedRequests()
      );
      const request = requests.find(r => 
        r.creator.id === prestataireId && 
        r.receiver.id === this.currentUserProfile.id
      );
      if (request && this.currentRequestId !== request.id) {
        this.currentRequestId = request.id;
        this.saveStateToStorage(prestataireId);
      }
    } catch (err) {
      console.error('Erreur lors de la recherche de la demande:', err);
    }
  }

  private startStatusChecking(prestataireId: string) {
    if (this.statusCheckInterval) {
      clearInterval(this.statusCheckInterval);
    }
    
    this.statusCheckInterval = setInterval(async () => {
      await this.checkRequestStatus(prestataireId);
    }, 10000); // Vérifier toutes les 10 secondes
  }

  getConnectionStatusMessage(): string {
    switch (this.requestStatus) {
      case 'not-sent': return 'Aucune demande envoyée';
      case 'pending': return 'Demande envoyée - En attente de réponse';
      case 'accepted': return 'Vous êtes connectés';
      case 'rejected': return 'Demande refusée';
      case 'waiting-for-current-user-response': 
        return 'Ce prestataire vous a envoyé une demande';
      default: return 'Statut inconnu';
    }
  }

  ngOnDestroy() {
    if (this.statusCheckInterval) {
      clearInterval(this.statusCheckInterval);
    }
  }
}
      
