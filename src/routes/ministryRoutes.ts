import { Router } from 'express';
import { getMinistryData } from '../controllers/ministryController';
import { authenticate } from '../middleware/authMiddleware';
import { restrictToMinistry } from '../middleware/ministryMiddleware';

const router = Router();

router.get('/data', authenticate, restrictToMinistry, getMinistryData);

export default router;