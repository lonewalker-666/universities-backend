import express from "express";
import {
  createUser,
  facebookLogin,
  getOtp,
  googleSignUP,
  issueRefreshToken,
  login,
  verifyOtp,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/refresh-token", issueRefreshToken);
router.post("/getOtp", getOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/google-sign-up", googleSignUP);
router.post("/facebook-sign-in", facebookLogin);

export default router;
