import express from 'express'
import { getGender, getGradeLevel, getPlans, getRace,getHighSchool, getApTestSubjects } from '../controllers/get.js';


const router = express.Router();


router.get("/plans", getPlans);
router.get("/gender", getGender);
router.get("/race", getRace);
router.get("/gradeLevel", getGradeLevel);
router.get("/highSchool", getHighSchool);
router.get("/apTestSubjects", getApTestSubjects);

export default router