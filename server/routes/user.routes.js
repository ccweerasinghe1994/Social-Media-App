import express from "express";
import userController from "../controller/user.controller";

const router = express.Router();

router.route("/api/users").get(userController.list).post(userController.create);

router
  .route("/api/users/:userId")
  .get(userController.read)
  .put(userController.update)
  .delete(userController.remove);

router.param("userId", userCtrl.userById);

export default router;
