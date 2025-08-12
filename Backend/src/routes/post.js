import express from "express";
import { isAdmin, verifyToken } from "../middleware/auth.js";
import { createPost, getAllPosts } from "../controller/post.js";

const router = express.Router();

router.post("/createPost", verifyToken, isAdmin, createPost);
router.get("/getAllPosts", verifyToken, getAllPosts);

export default router;
