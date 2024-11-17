import express from 'express'
import { getGender, getGradeLevel, getPlans, getRace,getHighSchool, getApTestSubjects, getOverview } from '../controllers/get.js';
import { authenticateToken } from "../middleware/token.js";


const router = express.Router();


router.get("/plans", getPlans);
router.get("/gender", getGender);
router.get("/race", getRace);
router.get("/gradeLevel", getGradeLevel);
router.get("/highSchool", getHighSchool);
router.get("/apTestSubjects", getApTestSubjects);
router.get("/overview",authenticateToken, getOverview);

export default router