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

userRouter.get("/:username", findUserByName);

userRouter.post("/create", createUser);

userRouter.put("/edit/:username", editUser);

userRouter.post("/login", login);

userRouter.get("/logout", logOut);

userRouter.get("/authorize", requireAuth, authorize);

export default userRouter;
