import { Router } from 'express';
import { createPayment, getAllPayment, getPaymentById, updatePayment, getPaymentByBookingId } from '../controllers/payment.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

router.post('/payments', authenticateToken, authorizeRole("MANAGER", "STAFF"), createPayment);
router.get('/payments', authenticateToken, authorizeRole("MANAGER", "STAFF"), getAllPayment);
router.get('/payments/:id', authenticateToken, authorizeRole("MANAGER", "STAFF"), getPaymentById);
router.put('/payments/:id', authenticateToken, authorizeRole("MANAGER", "STAFF"), updatePayment);
router.get('/payments/bookings/:bookingId', authenticateToken, authorizeRole("MANAGER"), getPaymentByBookingId);

export default router;