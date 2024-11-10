import express from 'express'
import { getCollegeOne, getCollegesList } from '../controllers/colleges.js';
import { authenticateToken } from '../middleware/token.js';



const router = express.Router();

router.post("/getColleges",authenticateToken, getCollegesList)
router.get("/getCollegeOne/:id",authenticateToken, getCollegeOne)

export default router;
