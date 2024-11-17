import express from "express";
import {
  createEssay,
  deleteEssay,
  editEssay,
  getEssay,
  getEssayOne,
} from "../controllers/essay.js";
import { authenticateToken } from "../middleware/token.js";

const router = express.Router();

router.get("/getAllEssay", authenticateToken, getEssay);
router.get("/getEssay/:essayId", authenticateToken, getEssayOne);

router.post("/createEssay", authenticateToken, createEssay);

router.put("/editEssay", authenticateToken, editEssay);

router.delete("/deleteEssay/:essayId", authenticateToken, deleteEssay);
export default router;
