import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CreateAvisDto } from '../dto/create-avis.dto'; // DTO pour la création d'avis
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard'; // Import du guard
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UseGuards } from '@nestjs/common'; // Ajoutez cette ligne


@Controller('comments') // Route de base : /comments
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
  @UseGuards(FirebaseAuthGuard)  // Appliquez le guard pour valider l'utilisateur
  async addComment(
    @Param('productId') productId: number,
    @Body() createAvisDto: CreateAvisDto,
    @GetUser() user: any, // Utilisation du décorateur pour récupérer l'utilisateur complet
  )  {
    
    return this.commentService.createComment(user, productId, createAvisDto);
  }
}