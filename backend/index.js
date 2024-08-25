import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//middleware to use body data
app.use(express.json());
//Middleware for handling cor policies
//allow all origin with default of cors(*)
app.use(cors());
// app.use({
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowHeaders: ["Content-Type"],
// });
app.use("/books", booksRoute);

config({
  path: "./config/config.env",
});

app.get("/", (req, res) => {
  res.status(234).send("Hello Here");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`Server run at port:http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
