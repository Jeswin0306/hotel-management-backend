import { Router } from 'express';
import { registerManagerController, loginController, registerStaffController,/*loginStaffController*/ } from '../controllers/auth.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

//register for manager, staff
router.post('/auth/manager/register', authenticateToken, authorizeRole("MANAGER"), registerManagerController);
router.post('/auth/staff/register', authenticateToken, authorizeRole("MANAGER"),registerStaffController);


router.post('/auth/login', loginController);

export default router;