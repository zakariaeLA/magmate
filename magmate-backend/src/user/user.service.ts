import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import UserRequestEntity from './entities/userrequest.entity';

import { switchMap } from 'rxjs/operators'; // Import de 'switchMap'
import { UserRequestStatus } from './entities/userrequest.entity';  // Adaptez le chemin en fonction de la localisation de votre fichier
import { In } from 'typeorm';
import { tap } from 'rxjs/operators';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserRequestEntity)
    private readonly userRequestRepository: Repository<UserRequestEntity>,
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
  
  

  findUserById(id: string): Observable<User> {
    // Nettoyage de l'UUID pour enlever les caractères indésirables (espaces, retours à la ligne)
    const cleanId = id.trim(); 
  
    return from(
      this.userRepository.findOne({
        where: { id: cleanId },
        relations: ['avis', 'reclamations', 'magasins', 'sentUserRequests', 'receivedUserRequests'],  // Ajuste les relations selon tes besoins
      })
    ).pipe(
      map((user: User) => {
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        delete user.password;  // Supprime le mot de passe avant d'envoyer les informations sensibles
        return user;
      })
    );
  }

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


    
    
  /*zineb */
  hasRequestBeenSentOrReceived(
    creator: User,
    receiver: User,
  ): Observable<boolean> {
    return from(
      this.userRequestRepository.findOne({
        where: [
          { creator: { id: creator.id }, receiver: { id: receiver.id } },
          { creator: { id: receiver.id }, receiver: { id: creator.id } },
        ],
      }),
    ).pipe(
      switchMap((userRequest: UserRequestEntity) => {
        if (!userRequest) return of(false);
        return of(true);
      }),
    );
  }
  async sendUserRequest(
    receiverId: string,
    creatorPayload: any, // Le payload Firebase, pas une entité User
  ): Promise<UserRequestEntity | { error: string }> {
    // 1. Trouver l'utilisateur créateur dans la base de données
    const creator = await this.userRepository.findOne({ 
      where: { email: creatorPayload.email } 
    });
  
    if (!creator) {
      return { error: 'Creator user not found in database' };
    }
  
    if (receiverId === creator.id) {
      return { error: 'Cannot send request to yourself' };
    }
  
    // 2. Trouver le receiver
    const receiver = await this.userRepository.findOne({ 
      where: { id: receiverId } 
    });
  
    if (!receiver) {
      return { error: 'Receiver not found' };
    }
  
    // 3. Vérifier si une demande existe déjà
    const existingRequest = await this.userRequestRepository.findOne({
      where: [
        { creator: { id: creator.id }, receiver: { id: receiver.id } },
        { creator: { id: receiver.id }, receiver: { id: creator.id } },
      ],
    });
  
    if (existingRequest) {
      return { error: 'Request already exists between these users' };
    }
  
    // 4. Créer et sauvegarder la nouvelle demande
    const userRequest = this.userRequestRepository.create({
      creator: { id: creator.id }, // Référence seulement par ID
      receiver: { id: receiver.id },
      status: UserRequestStatus.ACCEPTED
    });
  
    return this.userRequestRepository.save(userRequest);
  }
  
  
  getUserRequestStatus(
    receiverId: string,
    currentUser: User,
  ): Observable<{ status: string }> {
    return this.findUserById(receiverId).pipe(
      switchMap((receiver: User) => {
        return from(
          this.userRequestRepository.findOne({
            where: [
              { creator: { id: currentUser.id }, receiver: { id: receiver.id } },
              { creator: { id: receiver.id }, receiver: { id: currentUser.id } },
            ],
            relations: ['creator', 'receiver'],
          }),
        );
      }),
      map((userRequest: UserRequestEntity) => {
        if (!userRequest) {
          return { status: 'not-sent' };
        }
  
        if (userRequest.receiver.id === currentUser.id) {
          return { status: 'waiting-for-current-user-response' };
        }
  
        return { status: userRequest.status };
      }),
    );
  }
  
  getUserRequestUserById(userRequestId: number): Observable<UserRequestEntity> {
    return from(
      this.userRequestRepository.findOne({
        where: { id: userRequestId },  // Utilisez directement un objet et non un tableau
      })
    ).pipe(
      map((userRequest) => {
        if (!userRequest) {
          throw new HttpException('Demande non trouvée', HttpStatus.NOT_FOUND);
        }
        return userRequest;
      })
    );
  }
  
  respondToUserRequest(
    statusResponse: UserRequestStatus,
    userRequestId: number,
  ): Observable<UserRequestStatus> {
    return this.getUserRequestUserById(userRequestId).pipe(
      switchMap((userRequest: UserRequestEntity) => {
        if (!userRequest) {
          throw new HttpException('Demande non trouvée', HttpStatus.NOT_FOUND);
        }
  
        userRequest.status = statusResponse;
  
        return from(this.userRequestRepository.save(userRequest)).pipe(
          map((updatedRequest: UserRequestEntity) => updatedRequest.status),
        );
      }),
    );
  }
  
  getUserRequestsFromRecipients(
    currentUser: User,
  ): Observable<UserRequestEntity[]> {
    return from(
      this.userRequestRepository.find({
        where: [{ receiver: { id: currentUser.id } }],
        relations: ['receiver', 'creator'],
      }),
    );
  }
  

  getUsers(currentUser: User): Observable<User[]> {
    return from(
      this.userRequestRepository.find({
        where: [
          { creator: { id: currentUser.id }, status: UserRequestStatus.ACCEPTED },
          { receiver: { id: currentUser.id }, status: UserRequestStatus.ACCEPTED },
        ],
        relations: ['creator', 'receiver'],
      }),
    ).pipe(
      map((requests: UserRequestEntity[]) => {
        const userIds: string[] = [];
  
        for (const req of requests) {
          if (req.creator.id === currentUser.id) {
            userIds.push(req.receiver.id);
          } else {
            userIds.push(req.creator.id);
          }
        }
  
        return userIds;
      }),
      switchMap((userIds: string[]) => {
        if (userIds.length === 0) {
          return of([]);
        }
  
        return from(
          this.userRepository.find({
            where: { id: In(userIds) },
          }),
        );
      }),
      map((users: User[]) => {
        // Optionnel : nettoyer les mots de passe
        return users.map((user) => {
          delete user.password;
          return user;
        });
      }),
    );
  }
  
  


  /*
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
*/



  
}
