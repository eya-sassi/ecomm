import express from "express";
const router = express.Router();
//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
//controllers
import {
  create,
  update,
  remove,
  list,
  read,
  productByCategory,
} from "../controllers/category.js";
router.post("/category", requireSignin, isAdmin, create);
router.put("/category/:categoryId", requireSignin, isAdmin, update);
router.delete("/category/:categoryId", requireSignin, isAdmin, remove);
router.get("/categories", list);
router.get("/category/:slug", read);
router.get("/products-by-category/:slug", productByCategory);

export default router;
