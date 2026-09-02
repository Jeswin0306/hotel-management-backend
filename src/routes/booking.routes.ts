import { Router } from 'express';
import { createBooking, getAllBooking } from '../controllers/booking.controller';

const router = Router();

router.post('/bookings', createBooking);
router.get('/bookings', getAllBooking);

export default router;