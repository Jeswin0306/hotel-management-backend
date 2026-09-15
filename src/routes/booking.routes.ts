import { Router } from 'express';
import { createBooking, getAllBooking, getBookingById, checkOut, cancelRoomBookings, updateBookingController } from '../controllers/booking.controller';
import { authenticateToken, authorizeRole} from "../middleware/auth.middleware";

const router = Router();

router.post('/bookings', createBooking);
router.get('/bookings', getAllBooking);
router.get('/bookings/:id', getBookingById);
router.put('/bookings/:id/checkout', checkOut);
router.put('/bookings/:id/cancel', cancelRoomBookings);
router.put("/bookings/:id",updateBookingController);

export default router;