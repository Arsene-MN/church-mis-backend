import { AuthenticatedRequest } from '../types/customRequest';
import { Response, NextFunction } from 'express';

export const restrictToMinistry = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const userMinistry = req.user?.ministry;

  if (!userMinistry) {
    res.status(403).json({ message: 'Access denied. No ministry assigned.' });
    return;
  }

  // Attach the user's ministry to the request object
  req.ministry = userMinistry;
  next();
};  