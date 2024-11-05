import express from "express";
import {
    AddExtracurriculars,
  AddPreferedCollege,
  AddPreferedMajor,
  createProfile,
  DeleteExtracurriculars,
  DeletePreferedCollege,
  DeletePreferedMajor,
  getProfile,
  updateAccademicBackground,
  updateActTestScore,
  updateAdditionalInfo,
  updateAPTestScore,
  updateIELTSTestScore,
  updatePersonalInfo,
  updateProfile,
  updateProfilePersonal,
  updateSatTestScore,
  updateToeflTestScore,
} from "../controllers/user.js";
import { authenticateToken } from "../middleware/token.js";

const router = express.Router();

router.get("/getProfile", authenticateToken, getProfile);


router.post("/createProfile", authenticateToken, createProfile);
router.post("/updatePersonalInfo", authenticateToken, updatePersonalInfo);
router.post(
  "/updateAcademicBackground",
  authenticateToken,
  updateAccademicBackground
);
router.post("/updateActTestScore", authenticateToken, updateActTestScore);
router.post("/updateSatTestScore", authenticateToken, updateSatTestScore);
router.post("/updateToeflTestScore", authenticateToken, updateToeflTestScore);
router.post("/updateIELTSTestScore", authenticateToken, updateIELTSTestScore);
router.post("/updateApTestScore", authenticateToken, updateAPTestScore);
router.post("/addExtracurriculars", authenticateToken, AddExtracurriculars);
router.post("/addPreferedCollege", authenticateToken, AddPreferedCollege);
router.post("/addPreferedMajor", authenticateToken, AddPreferedMajor);

router.put("/updateProfile", authenticateToken, updateProfile);
router.put("/updateProfilePersonal", authenticateToken, updateProfilePersonal);
router.put("/updateAdditionalInfo", authenticateToken, updateAdditionalInfo);

router.delete("/deleteExtracurriculars", authenticateToken, DeleteExtracurriculars);
router.delete("/deletePreferedCollege", authenticateToken, DeletePreferedCollege);
router.delete("/deletePreferedMajor", authenticateToken, DeletePreferedMajor);

export default router;
