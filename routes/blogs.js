import express from 'express'
import { getAllBlogs, getBlogData } from '../controllers/blogs.js';


const router = express.Router();


router.get("/getAll", getAllBlogs);
router.get("/getBlogData/:uuid", getBlogData);


export default router