import { Router } from 'express';
import { createBooking, getAllBooking, getBookingById, checkOut, cancelRoomBookings } from '../controllers/booking.controller';

const router = Router();

router.post('/bookings', createBooking);
router.get('/bookings', getAllBooking);
router.get('/bookings/:id', getBookingById);
router.put('/bookings/:id/checkout', checkOut);
router.put('/bookings/:id/cancel', cancelRoomBookings);

export default router;