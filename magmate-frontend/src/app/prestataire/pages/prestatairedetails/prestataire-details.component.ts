import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestatairedetailsService } from '../../services/prestatairedetails.service';
import { CommentPrestataireService } from '../../services/comment-prestataire.service';
import { ReclamationPrestataireService } from '../../services/reclamation-prestataire.service';
import { CommentPrestataire } from '../../models/comment-prestataire.model';
import { Reclamationprestataire } from '../../models/reclamation-prestataire.model';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { CreateReclamationPrestataireDto } from '../../dto/create-reclamation-prestataire.dto';
import { AuthService } from 'C:/magmate/magmate-frontend/src/app/auth/auth.service'; 

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

  constructor(
    private route: ActivatedRoute,
    private prestataireService: PrestatairedetailsService,
    private commentService: CommentPrestataireService,
    private reclamationService: ReclamationPrestataireService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user.id;

    if (this.uuid) {
      this.prestataireId = this.uuid;
      this.newComment.prestataireId = this.uuid;
      
      this.newComment.userId = this.userId;
     

      this.getPrestataireDetails(this.uuid);
      this.loadComments(this.uuid);
      
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
}

  

