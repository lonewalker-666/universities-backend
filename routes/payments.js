import express from "express";
import { authenticateToken } from "../middleware/token.js";
import { checkSessionStatus, createCheckoutSession } from "../controllers/payments.js";


const router = express.Router();

router.post('/create-checkout-session', authenticateToken, createCheckoutSession);
router.get('/check-session-status', authenticateToken, checkSessionStatus);

export default router