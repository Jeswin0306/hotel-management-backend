import { Router } from 'express';
import { createRoomType, getAllRoomType, getRoomTypeById, modifyRoomType, deleteRoomType } from '../controllers/roomType.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

router.post('/roomtypes', authenticateToken, authorizeRole("MANAGER"), createRoomType);
router.get('/roomtypes', authenticateToken, authorizeRole("MANAGER"), getAllRoomType);
router.get('/roomtypes/:id', authenticateToken, authorizeRole("MANAGER"), getRoomTypeById);
router.put('/roomtypes/:id', authenticateToken, authorizeRole("MANAGER"), modifyRoomType);
router.delete('/roomtypes/:id', authenticateToken, authorizeRole("MANAGER"), deleteRoomType);


export default router;