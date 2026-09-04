import { Router } from 'express';
import { createPayment } from '../controllers/payment.controller';

const router = Router();

router.post('/payment', createPayment);

export default router;