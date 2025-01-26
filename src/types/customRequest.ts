import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
    ministry?: string; // Add the ministry property
  };
  ministry?: string; // Add the ministry property to the request object
}