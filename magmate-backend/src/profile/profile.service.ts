import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getProfileByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return {
      id: user.id,
      email: user.email,
      fname: user.fname,
      lname: user.lname,
      photo: user.photo,
    };
  }

  async updateProfilePhoto(email: string, file: Express.Multer.File) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');
    // Supprimer l'ancienne image si elle existe
    if (user.photo) {
      // Extraire juste le nom du fichier depuis l'URL
      const filename = path.basename(user.photo); // ← ici la magie
  
      const oldPath = path.join(__dirname, '..', '..', 'uploads', filename);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    const filename = `http://localhost:3000/uploads/${file.filename}`;
    user.photo = filename;

    await this.userRepository.save(user);

    return {
      message: 'Photo mise à jour',
      photo: `http://localhost:3000/uploads/${file.filename}`,
    };
  }
}
