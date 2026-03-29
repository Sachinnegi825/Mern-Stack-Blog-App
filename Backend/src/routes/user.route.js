import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlerwares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(authMiddleware, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

export default router;
