import express from "express";
import { isAdmin, verifyToken } from "../middleware/auth.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
  updatePost,
} from "../controller/post.js";

const router = express.Router();

router.post("/createPost", verifyToken, isAdmin, createPost);
router.get("/getAllPosts", verifyToken, getAllPosts);
router.get("/getAPost/:id", verifyToken, getOnePost);
router.patch("/updatePost/:id", verifyToken, isAdmin, updatePost);
router.delete("/deletePost/:id", verifyToken, isAdmin, deletePost);

export default router;
