import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
dotenv.config();

const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@personalproject.c4kuocv.mongodb.net/RestaurantService?retryWrites=true&w=majority&appName=PersonalProject`;

const PORT = process.env.PORT || 5000;

app.route("/api/users", userRouter);

/* Connect to database */
mongoose
  .connect(url)
  .then(() => {
    console.log("Established connection to database.");
  })
  .catch((err) => {
    console.error(err);
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  });
