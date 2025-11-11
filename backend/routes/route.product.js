import express from "express";
import {
  create,
  deleteProduct,
  getAll,
  updateProduct,
} from "../controllers/controllers.product.js";

const router = express.Router();

router.post("/", create);
router.get("/", getAll);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
