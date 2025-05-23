// src/config/multer.config.ts
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './public/images',  // Directory where uploaded files will be stored
    filename: (req, file, callback) => {
      // Generate a unique filename using the current timestamp and a random number
      const fileExtension = extname(file.originalname);  // Extract file extension (e.g., .jpg)
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtension}`;  // Generate a unique filename
      callback(null, fileName);  // Use the unique file name
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024,  // Max file size (10MB)
  },
};
