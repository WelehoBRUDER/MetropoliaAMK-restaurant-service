import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/public", express.static("public"));
app.use("/api/uploads", express.static("uploads"));

export default app;
