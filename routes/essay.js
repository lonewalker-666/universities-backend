import express from 'express'
import { getEssay, getEssayOne } from '../controllers/essay.js';
import { authenticateToken } from "../middleware/token.js";


const router = express.Router();


router.get("/getAllEssay",authenticateToken, getEssay);
router.get("/getEssay/:essayId",authenticateToken, getEssayOne);


export default router