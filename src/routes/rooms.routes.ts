import { createRoom, getRooms, getRoomById, updateRoom, deleteRoom } from '../controllers/rooms.controller';
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/rooms', createRoom);
router.get('/rooms', authenticateToken, getRooms);
router.get('/rooms/:id', getRoomById);
router.put('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);

export default router;
