import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productsRoutes from "./routes/products.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import ordersRoutes from "./routes/orders.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/orders", ordersRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});