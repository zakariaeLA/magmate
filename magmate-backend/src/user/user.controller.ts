import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
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
  async getProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getProfile(id);
  }
  //   avec firebase
  //   @Get('profile')
  //   @UseGuards(FirebaseAuthGuard)
  //   getProfile(@Request() req) {
  //      return this.userService.getProfile(req.user.id);  // une fois l'auth Firebase branchée
  //   }

  // // Route pour mettre à jour le profil
  // @Put('profile/:id')
  // async updateProfile(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body(new ValidationPipe({ whitelist: true })) updateUserDto: UpdateUserDto,
  // ) {
  //   return this.userService.updateProfile(id, updateUserDto);
  // }

  //Route pour creer un utilisateur
  @Post()
  async createUser(
    @Body(new ValidationPipe({ whitelist: true })) createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto);
  }
  @Get('uuid-by-email')
  async getUuidByEmail(@Query('email') email: string) {
    const uuid = await this.userService.getUuidByEmail(email);
    return { uuid }; // <- Objet contenant le champ `uuid`
  }
}
