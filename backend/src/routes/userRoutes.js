import express from "express";
import {
  createUser,
  editUser,
  login,
  logOut,
  authorize,
  findUserByName,
} from "../controllers/userController.js";
import requireAuth from "../auth/auth.js";

const userRouter = express.Router();

userRouter.get("/one/:username", findUserByName);

userRouter.post("/create", createUser);

userRouter.put("/edit/:username", editUser);

userRouter.post("/login", login);

userRouter.get("/logout", logOut);

userRouter.get("/me", requireAuth, authorize);

export default userRouter;
