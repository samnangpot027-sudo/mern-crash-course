import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectBD } from "./config/db.js";

import productRouter from "./routes/route.product.js";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/product", productRouter);

// 2️⃣ Serve frontend only in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectBD();
  console.log("listening port:" + PORT);
});

// Ky2vcYRRohNskJ5x
