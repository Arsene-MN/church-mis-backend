import { Router } from 'express';
import authRoutes from './authRoutes';
import memberRoutes from './memberRoutes';
import ministryRoutes from './ministryRoutes';
import donationRoutes from './donationRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/members', memberRoutes);
router.use('/ministry', ministryRoutes); 
router.use('/donations', donationRoutes);

export default router;