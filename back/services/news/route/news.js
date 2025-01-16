import express from "express";
import {
  createNews,
  getNews,
  updateNews,
  deleteNews,
} from "../controllers/news.js";

const router = express.Router();

router.post("/", async (req, res) => {
  await createNews(req, res);
});
router.get("/", async (req, res) => { 
  await getNews(req, res);
});
router.put("/:id", async (req, res) => {
  await updateNews(req, res);
});
router.delete("/:id", async (req, res) => { 
  await deleteNews(req, res);
});

export default router;
