import express from "express";
import authRouter from "./auth.js";
import getRouter from "./get.js"
import blogsRouter from "./blogs.js"
import userRouter from "./user.js"
import essayRouter from "./essay.js"


const router = express.Router();

router.use("/auth", authRouter);
router.use("/get", getRouter);
router.use("/blogs",blogsRouter)
router.use("/user",userRouter)
router.use("/essay",essayRouter)



export default router;