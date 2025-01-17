import express from "express";
import dotenv from "dotenv";
import news from "./route/news.js";
import connectDB from "./db/db.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use("/news", news);


app.listen(process.env.NEWS_PORT, () => {
  console.log(`Server is running on port ${process.env.NEWS_PORT}`);
});

