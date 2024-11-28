import express from "express";
import { authenticateToken } from "../middleware/token.js";
import { createChat } from "../controllers/chat.js";


const router = express.Router();

router.post('/createChat', authenticateToken, createChat);

export default router