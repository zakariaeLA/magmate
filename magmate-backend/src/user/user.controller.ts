import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Route pour obtenir le profil
  @Get('profile/:id')
  // @UseGuards(FirebaseAuthGuard)
  async getProfile(@Param('id') id: string) {
    return this.userService.getProfile(id);
  }
  //   avec firebase
  //   @Get('profile')
  //   @UseGuards(FirebaseAuthGuard)
  //   getProfile(@Request() req) {
  //      return this.userService.getProfile(req.user.id);  // une fois l'auth Firebase branchée
  //   }

  // Route pour mettre à jour le profil
  @Put('profile/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateProfile(id, updateUserDto);
  }

  //Route pour creer un utilisateur
  @Post()  
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
