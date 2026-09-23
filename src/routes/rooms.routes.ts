import { createRoom, getRooms, getRoomById, updateRoom, deleteRoom } from '../controllers/rooms.controller';
import { Router } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

router.post('/rooms', authenticateToken, authorizeRole("MANAGER"), createRoom);
router.get('/rooms', authenticateToken, authorizeRole("MANAGER", "STAFF"), getRooms);
router.get('/rooms/:id', authenticateToken, authorizeRole("MANAGER", "STAFFF"), getRoomById);
router.put('/rooms/:id', authenticateToken, authorizeRole("MANAGER"), updateRoom);
router.delete('/rooms/:id', authenticateToken, authorizeRole("MANAGER"), deleteRoom);

export default router;


//ithu room ooda router so ithula endpoints ella irukum
