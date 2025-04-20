import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async loginOrCreateUser(
    decodedToken: admin.auth.DecodedIdToken,
    fnameFromForm?: string,
    lnameFromForm?: string,
    passwordFromForm?: string,
  ): Promise<User> {
    const { email, name, picture,firebase } = decodedToken;

    let user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      const fname = fnameFromForm ?? (name?.split(' ')[0] || 'Inconnu');
      const lname =
        lnameFromForm ?? (name?.split(' ').slice(1).join(' ') || '');

      const isGoogleSignUp = firebase?.sign_in_provider === 'google.com';

      let hashedPassword: string | undefined;

      if (!isGoogleSignUp) {
        if (!passwordFromForm) {
          throw new Error("Mot de passe requis pour l'inscription.");
        }
        hashedPassword = await bcrypt.hash(passwordFromForm, 10);
      }
      user = this.userRepo.create({
        email,
        fname,
        lname,
        photo: picture,
        password: hashedPassword,
      });

      await this.userRepo.save(user);
    }

    return user;
  }

  }
