import { Router } from 'express';
import { createRoomType, getAllRoomType, getRoomTypeById, modifyRoomType, deleteRoomType } from '../controllers/roomType.controller';

const router = Router();

router.post('/roomtypes', createRoomType);
router.get('/roomtypes', getAllRoomType);
router.get('/roomtypes/:id', getRoomTypeById);
router.put('/roomtypes/:id', modifyRoomType);
router.delete('/roomtypes/:id', deleteRoomType);


export default router;