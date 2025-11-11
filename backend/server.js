import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectBD } from "./config/db.js";

import productRouter from "./routes/route.product.js";

dotenv.config();

const app = express();
app.use(express.json());

// 1. Use the environment variable for PORT or default to 5000
const PORT = process.env.PORT || 5000;

// 2. IMPORTANT: Specify the host as '0.0.0.0' for deployment platforms like Render
const HOST = "0.0.0.0";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/product", productRouter);

// 3. Server the frontend only in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });
}

// 4. Connect to the DB first, then start the server when successful.
// Note: We are now calling connectBD() before app.listen() is successful.
connectBD();

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
  // Removed connectBD() from here
});
