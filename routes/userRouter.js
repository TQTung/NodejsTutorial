import express from "express";
import { body, validationResult } from "express-validator";
import { userController } from "../controllers/index.js";

const userRouter = express.Router();

userRouter.get("/", userController.getAllUser);
userRouter.get("/:id", userController.getDetailUser);
userRouter.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  userController.login
);
userRouter.post("/register", userController.register);

export default userRouter;
