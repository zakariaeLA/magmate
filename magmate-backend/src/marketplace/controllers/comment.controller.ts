import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CreateAvisDto } from '../dto/create-avis.dto';  // DTO pour la création d'avis

@Controller('comments')  // Route de base : /comments
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Route pour récupérer tous les commentaires d'un produit
  @Get(':productId')
  async getComments(@Param('productId') productId: number) {
    // Appelle le service pour récupérer les commentaires du produit par son ID
    return this.commentService.getCommentsByProductId(productId);
  }

  // Route pour ajouter un commentaire à un produit
  @Post(':productId')
  async addComment(
    @Param('productId') productId: number,    // Paramètre de l'ID du produit
    @Body() createAvisDto: CreateAvisDto,     // Récupère le body (les données du commentaire)
  ) {
    // Appelle le service pour créer un nouveau commentaire pour ce produit
    return this.commentService.createComment(productId, createAvisDto);
  }
}


