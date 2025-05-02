import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service'; // Importer le service des commentaires
import { Avis } from '../../models/avis.model'; // Modèle pour les commentaires

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
  standalone:false
})
export class CommentListComponent implements OnInit {
  @Input() productId!: number; // Récupérer l'ID du produit via @Input
  comments: Avis[] = []; // Tableau pour stocker les commentaires

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    if (this.productId) {
      this.loadComments(); // Charger les commentaires au démarrage
    }
  }

  // Charger les commentaires depuis le service
  loadComments() {
    this.commentService.getCommentsByProductId(this.productId).subscribe(
      (comments: Avis[]) => {
        this.comments = comments; // Assigner les commentaires récupérés
      },
      (error) => {
        console.error('Erreur lors de la récupération des commentaires', error);
      }
    );
  }
}
