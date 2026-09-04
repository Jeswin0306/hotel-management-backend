import { Router } from "express";
import { createGuest, getAllGuests, getGuestById, updateGuest, deleteGuest} from "../controllers/guest.controller";

const router = Router();

router.post('/guest', createGuest);
router.get('/guest', getAllGuests);
router.get('/guest/:id', getGuestById);
router.put('/guest/:id', updateGuest);
router.delete('/guest/:id', deleteGuest);

export default router;