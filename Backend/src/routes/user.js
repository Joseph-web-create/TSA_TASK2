import express from "express";
import {
  registerUser,
  loginUser,
  changeToAdmin,
  getUser,
  logout,
} from "../controller/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/logOut", logout);
router.post("/login", loginUser);
router.get("/user", verifyToken, getUser);
router.patch("/changeRole/:id", verifyToken, changeToAdmin);

export default router;
