import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Méthode pour récupérer le profil
  async getProfile(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('Utilisateur non trouve', HttpStatus.NOT_FOUND);
    }

    return user;
  }
  async getUuidByEmail(email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user.id;
  }
  
  

  // // Méthode pour mettre à jour le profil
  // async updateProfile(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  //   // const user = await this.userRepository.findOne({ where: { id } });
  //   // if (!user) {
  //   //   throw new Error('Utilisateur non trouvé');
  //   // }
  //   const user = await this.getProfile(id);
    
  //   if (updateUserDto.fname) user.fname = updateUserDto.fname;
  //   if (updateUserDto.lname) user.lname = updateUserDto.lname;
  //   if (updateUserDto.photo) user.photo = updateUserDto.photo;
    
  //   if (updateUserDto.email && user.email !== updateUserDto.email) {
  //     const userExists = await this.userRepository.findOne({
  //       where: { email: updateUserDto.email },
  //     });
  //     if (userExists) {
  //       throw new HttpException(
  //         " Cet email n'est pas valide ",
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     } else {
  //       user.email = updateUserDto.email;
  //     }
  //   }
    
  //   if (updateUserDto.password) {
  //     const samePassword = await bcrypt.compare(
  //       updateUserDto.password,
  //       user.password,
  //     );
  //     if (samePassword) {
  //       throw new HttpException(
  //         "Le mot de passe doit être différent de l'ancien",
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }

  //     const salt = await bcrypt.genSalt();
  //     user.password = await bcrypt.hash(updateUserDto.password, salt);
  //   }

  //   return this.userRepository.save(user);
  // }

  // Méthode pour creer un utilisateur
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Vérification si l'email existe déjà
    const userExists = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new HttpException(
        " Cet email n'est pas valide ",
        HttpStatus.BAD_REQUEST,
      );
    }

    //Si l'email n'existe pas, on le crée
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }
  
}
