import { AuthenticatedRequest } from '../types/customRequest';
import { Response } from 'express';

export const getMinistryData = (req: AuthenticatedRequest, res: Response): void => {
  const ministry = req.ministry;
  res.json({ message: `Data for ${ministry}` });
};