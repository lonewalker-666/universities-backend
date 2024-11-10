import express from 'express'
import { createEssay, editEssay, getEssay, getEssayOne } from '../controllers/essay.js';
import { authenticateToken } from "../middleware/token.js";


const router = express.Router();


router.get("/getAllEssay",authenticateToken, getEssay);
router.get("/getEssay/:essayId",authenticateToken, getEssayOne);

router.post("/createEssay",authenticateToken, createEssay);

router.put("/editEssay",authenticateToken, editEssay);
export default router