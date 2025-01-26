import { Router } from 'express';
import { login, signup, resetPassword, setPassword } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/reset-password', resetPassword);
router.post('/set-password', setPassword);


export default router;