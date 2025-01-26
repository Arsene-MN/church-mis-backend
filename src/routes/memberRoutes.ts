import { Router } from 'express';
import { addMember, updateMember, deleteMember, getMembers, addPastor } from '../controllers/memberController';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';

const router = Router();

router.post('/', authenticate, authorize(['admin']), addMember);
router.post('/add-pastor', authenticate, authorize(['admin']), addPastor); // Add this line
router.put('/:id', authenticate, authorize(['admin']), updateMember);
router.delete('/:id', authenticate, authorize(['admin']), deleteMember);
router.get('/', authenticate, getMembers);

export default router;