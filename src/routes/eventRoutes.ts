import { Router } from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/eventController';
import { authenticate } from '../middleware/authMiddleware'; // Import authenticate from authMiddleware
import { authorize } from '../middleware/roleMiddleware'; // Import authorize from roleMiddleware

const router = Router();

// Use middleware functions correctly
router.post('/', authenticate, authorize(['admin']), createEvent);
router.get('/', getEvents);
router.put('/:id', authenticate, authorize(['admin']), updateEvent);
router.delete('/:id', authenticate, authorize(['admin']), deleteEvent);

export default router;