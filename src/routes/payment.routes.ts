import { Router } from 'express';
import { createPayment, getAllPayment, getPaymentById, updatePayment, getPaymentByBookingId } from '../controllers/payment.controller';

const router = Router();

router.post('/payments', createPayment);
router.get('/payments', getAllPayment);
router.get('/payments/:id', getPaymentById);
router.put('/payments/:id', updatePayment);
router.get('/payments/bookings/:bookingId',getPaymentByBookingId);

export default router;