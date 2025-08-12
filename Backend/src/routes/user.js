import express from "express";
import { registerUser, loginUser, changeToAdmin } from "../controller/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/changeRole/:id", verifyToken, changeToAdmin);

export default router;
