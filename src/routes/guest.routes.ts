import { Router } from "express";
import { createGuest, getAllGuests, getGuestById, updateGuest, deleteGuest} from "../controllers/guest.controller";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware";

const router = Router();

router.post('/guest', authenticateToken, authorizeRole("MANAGER", "STAFF"),createGuest);
router.get('/guest', authenticateToken, authorizeRole("MANAGER", "STAFF"),getAllGuests);
router.get('/guest/:id', authenticateToken, authorizeRole("MANAGER", "STAFF"),getGuestById);
router.put('/guest/:id', authenticateToken, authorizeRole("MANAGER", "STAFF"),updateGuest);
router.delete('/guest/:id', authenticateToken, authorizeRole("MANAGER"),deleteGuest);

export default router;