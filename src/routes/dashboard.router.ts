import { Router } from "express";
import { dashboard} from "../controllers/dashboard.constroller";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware";

const router = Router();

router.get('/dashboard', authenticateToken, authorizeRole("MANAGER"), dashboard);

export default router;