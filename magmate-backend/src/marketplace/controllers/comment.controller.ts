import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CreateAvisDto } from '../dto/create-avis.dto';  
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { User } from 'src/user/entities/user.entity';

@Controller('comments') 


export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  
  @Get(':productId')
  async getComments(@Param('productId') productId: number) {
    return this.commentService.getCommentsByProductId(productId);
  }

  @UseGuards(FirebaseAuthGuard) 

  
  @Post(':productId')
  async addComment(

    @Param('productId') productId: number,   
    @Body() createAvisDto: CreateAvisDto, 
    @GetUser() user: RequestWithUser['user']   

  ) {
   
    return this.commentService.createComment(productId, createAvisDto, user);
  }
}
