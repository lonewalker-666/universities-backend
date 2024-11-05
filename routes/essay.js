import express from 'express'
import { getEssay, getEssayOne } from '../controllers/essay';


const router = express.Router();


router.get("/getAll", getEssay);
router.get("/getOne/:id", getEssayOne);


export default router