import express from "express";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.route("/auth/signin").post(AuthController.signIN);
router.route("/auth/signout").get(AuthController.signOut);

export default router;
