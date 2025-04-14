import express from "express";
import {
  createUser,
  editUser,
  login,
  logOut,
  authorize,
  findUserByName,
  editUserPicture,
} from "../controllers/userController.js";
import requireAuth from "../auth/auth.js";
import {upload, createThumbnail} from "../middleware/thumbnail.js";

const userRouter = express.Router();

userRouter.get("/one/:username", findUserByName);

userRouter.post("/create", createUser);

userRouter.post(
  "/picture/:username",
  upload.single("file"),
  requireAuth,
  createThumbnail,
  editUserPicture
);

userRouter.put(
  "/edit/:username",
  requireAuth,
  upload.single("file"),
  createThumbnail,
  editUser
);

userRouter.post("/login", login);

userRouter.get("/logout", logOut);

userRouter.get("/me", requireAuth, authorize);

export default userRouter;
