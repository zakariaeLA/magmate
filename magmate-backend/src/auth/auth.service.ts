import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async loginOrCreateUser(
    decodedToken: admin.auth.DecodedIdToken,
  ): Promise<User> {
    const { email, name, picture } = decodedToken;

    let user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      const [fname, ...lnameParts] = name?.split(' ') || ['Inconnu'];
      const lname = lnameParts.join(' ') || '';

      user = this.userRepo.create({
        email,
        fname,
        lname,
        photo: picture,
      });

      await this.userRepo.save(user);
    }

    return user;
  }
}
