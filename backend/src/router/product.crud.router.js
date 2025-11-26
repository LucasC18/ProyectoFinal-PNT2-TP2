import { Router } from "express";
import { authenticateToken } from "../middleware/authentication.js";
import role from "../middleware/role.js";
import { ProductController } from "../controllers/Product.js";

const ProductCrudRouter = Router();

ProductCrudRouter.post(
  "/create",
  authenticateToken,
  role("admin"),
  ProductController.createByJson
);

ProductCrudRouter.put(
  "/update/:id",
  authenticateToken,
  role("admin"),
  ProductController.updateByJson
);

ProductCrudRouter.delete(
  "/delete/:id",
  authenticateToken,
  role("admin"),
  ProductController.deleteById
);

export default ProductCrudRouter;
