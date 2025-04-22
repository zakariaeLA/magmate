import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    email: string;
    // tu peux aussi inclure id, roles, etc si tu veux
  };
}
