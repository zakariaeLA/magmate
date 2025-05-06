import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestWithUser } from '../common/interfaces/request-with-user.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get()
  async getProfile(@GetUser() user: any) {
    return this.profileService.getProfileByEmail(user.email);
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch('update-photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|jpg)$/)) {
          return callback(
            new Error('Seuls les fichiers JPG, JPEG et PNG sont autorisés'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 2 * 1024 * 1024, // Limite à 2 Mo
      },
    }),
  )
  async updatePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    const email = req.user.email;
    return this.profileService.updateProfilePhoto(email, file);
  }
}
