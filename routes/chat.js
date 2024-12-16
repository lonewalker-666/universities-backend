import express from "express";
import { authenticateToken } from "../middleware/token.js";
import { askBot, createChat, getChat, getChatHistory } from "../controllers/chat.js";


const router = express.Router();

router.get('/getChatHistory', authenticateToken, getChatHistory);
router.get('/getChat/:chat_id', authenticateToken, getChat);

router.post('/createChat', authenticateToken, createChat);
router.post('/askBot',authenticateToken,askBot)

export default router