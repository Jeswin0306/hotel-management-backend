import { Router } from 'express';
import { registerController, loginController } from '../controllers/auth.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

//register for manager, staff
router.post('/auth/register', authenticateToken, authorizeRole("MANAGER"), registerController);

router.post('/auth/login', loginController);

export default router;