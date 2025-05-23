import express from "express";
import {
  createUser,
  editUser,
  login,
  logOut,
  authorize,
  findUserByName,
  editUserPicture,
  addFavoriteRestaurant,
  removeFavoriteRestaurant,
} from "../controllers/userController.js";
import requireAuth from "../auth/auth.js";
import {upload, createThumbnail} from "../middleware/thumbnail.js";

const userRouter = express.Router();

userRouter.get("/one/:username", findUserByName);

userRouter.post("/signup", createUser);

userRouter.post(
  "/picture/:username",
  upload.single("file"),
  requireAuth,
  createThumbnail,
  editUserPicture
);

userRouter.put("/edit/:username", requireAuth, editUser);

userRouter.post("/login", login);

userRouter.get("/logout", requireAuth, logOut);

userRouter.get("/me", requireAuth, authorize);

userRouter.post("/favorite/:id", requireAuth, addFavoriteRestaurant);

userRouter.post("/remove-favorite/:id", requireAuth, removeFavoriteRestaurant);

export default userRouter;
