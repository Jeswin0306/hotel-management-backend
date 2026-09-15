import { Router } from "express";
import { dashboard} from "../controllers/dashboard.constroller";

const router = Router();

router.get('/dashboard', dashboard);

export default router;