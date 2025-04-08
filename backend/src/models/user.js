import mongoose from "mongoose";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail.js";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minlength: [3, "Username must be at least 3 characters long."],
    maxlength: [30, "Username can be at most 30 characters long."],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  email: {
    type: String,
    required: false,
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  fullname: String,
  profile_picture: String,
  date_registered: Date,
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// static method to log in user
UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({username});
  if (user) {
    const isMatch = await user.verifyPassword(password);
    if (isMatch) {
      return user;
    }
    throw Error("Email or password incorrect");
  }
  throw Error("No user with this username");
};

const User = mongoose.model("User", UserSchema, "users");
export default User;
