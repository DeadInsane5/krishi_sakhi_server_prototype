import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority"
).then(() => console.log("MongoDB Atlas Connected"))
 .catch(err => console.log(err));

app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
