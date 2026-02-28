import express from "express";
import multer from "multer";
import { getReviews, createReview } from "../controllers/reviews.controller.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", multer().single("image"), createReview);

export default router;