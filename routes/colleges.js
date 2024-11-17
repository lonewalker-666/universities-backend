import express from 'express'
import { addToWishlist, getCollegeOne, getCollegesList, getWishlist, recentlyVisited } from '../controllers/colleges.js';
import { authenticateToken } from '../middleware/token.js';



const router = express.Router();

router.get("/getCollegeOne/:id",authenticateToken, getCollegeOne)
router.get("/getWishlist",authenticateToken, getWishlist)
router.get("/recentlyVisited",authenticateToken, recentlyVisited)


router.post("/getColleges",authenticateToken, getCollegesList)

router.put("/addToWishlist",authenticateToken, addToWishlist)


export default router;
