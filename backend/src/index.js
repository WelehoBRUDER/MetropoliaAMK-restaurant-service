import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@personalproject.c4kuocv.mongodb.net/RestaurantService?retryWrites=true&w=majority&appName=PersonalProject`;
