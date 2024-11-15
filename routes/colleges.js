import express from 'express'
import { getCollegeOne, getCollegesList } from '../controllers/colleges.js';
import { authenticateToken } from '../middleware/token.js';



const router = express.Router();

router.get("/getCollegeOne/:id",authenticateToken, getCollegeOne)
router.post("/getColleges",authenticateToken, getCollegesList)

router.put("/addToWishlist/:id",authenticateToken, getCollegeOne)


export default router;
