require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const app = express();
app.use(cors());
app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

/* ===============================
   GET REVIEWS
================================ */
app.get("/reviews", async (req, res) => {
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/reviews?select=*&order=created_at.desc`,
            {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
});

/* ===============================
   ADD REVIEW WITH IMAGE
================================ */
app.post("/reviews", upload.single("image"), async (req, res) => {
    try {
        const { name, rating, review_comment, product } = req.body;
        const file = req.file;

        if (!name || !rating) {
            return res.status(400).json({ error: "Name and rating required" });
        }

        let imageUrl = null;

        /* ---------- Upload image to Supabase Storage ---------- */
        if (file) {
            const fileName = `${Date.now()}-${file.originalname}`;

            const uploadResponse = await fetch(
                `${process.env.SUPABASE_URL}/storage/v1/object/review-images/${fileName}`,
                {
                    method: "POST",
                    headers: {
                        apikey: process.env.SUPABASE_KEY,
                        Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
                        "Content-Type": file.mimetype,
                    },
                    body: file.buffer,
                }
            );

            const uploadData = await uploadResponse.json();

            if (!uploadResponse.ok) {
                console.log(uploadData);
                return res.status(500).json(uploadData);
            }

            // public URL
            imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/review-images/${fileName}`;
        }

        /* ---------- Insert review row ---------- */
        const dbResponse = await fetch(
            `${process.env.SUPABASE_URL}/rest/v1/reviews`,
            {
                method: "POST",
                headers: {
                    apikey: process.env.SUPABASE_KEY,
                    Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
                    "Content-Type": "application/json",
                    Prefer: "return=representation",
                },
                body: JSON.stringify({
                    name,
                    rating: Number(rating),
                    review_comment,
                    image_url: imageUrl,
                    product,
                }),
            }
        );

        const data = await dbResponse.json();

        if (!dbResponse.ok) {
            console.log(data);
            return res.status(500).json(data);
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to submit review" });
    }
});

// Serve review images through backend to avoid CORS issues
app.get("/review-image/:name", async (req, res) => {
    try {
        const imageUrl = `https://tdpqappqxoufohoutbfj.supabase.co/storage/v1/object/public/review-images/${req.params.name}`;

        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();

        res.set("Content-Type", response.headers.get("content-type"));
        res.send(Buffer.from(buffer));


    } catch (err) {
        res.status(500).send("Image load failed");
    }
});


/* ===============================
   START SERVER
================================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});