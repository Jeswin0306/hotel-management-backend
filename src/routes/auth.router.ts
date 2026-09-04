import { Router } from 'express';
import { registerManagerController, loginController, registerStaffController,/*loginStaffController*/ } from '../controllers/auth.controller';

const router = Router();

//register for manager, staff
router.post('/auth/manager/register', registerManagerController);
router.post('/auth/staff/register', registerStaffController);


router.post('/auth/login', loginController);

export default router;