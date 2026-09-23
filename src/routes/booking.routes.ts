import { Router } from 'express';
import { createBooking, getAllBooking, getBookingById, checkOut, cancelRoomBookings, updateBookingController } from '../controllers/booking.controller';
import { authenticateToken, authorizeRole} from "../middleware/auth.middleware";

const router = Router();

router.post('/bookings', authenticateToken, authorizeRole("MANAGER", "STAFF"), createBooking);
router.get('/bookings', authenticateToken, authorizeRole("MANAGER", "STAFF"),getAllBooking);
router.get('/bookings/:id', authenticateToken, authorizeRole("MANAGER", "STAFF"),getBookingById);
router.put('/bookings/:id/checkout', authenticateToken, authorizeRole("MANAGER", "STAFF"),checkOut);
router.put('/bookings/:id/cancel', authenticateToken, authorizeRole("MANAGER", "STAFF"), cancelRoomBookings);
router.put("/bookings/:id",authenticateToken, authorizeRole("MANAGER", "STAFF"),updateBookingController);

export default router;