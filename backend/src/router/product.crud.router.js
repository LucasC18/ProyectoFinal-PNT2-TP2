import { Router } from "express";
import { authenticateToken } from "../middleware/authentication.js";
import role from "../middleware/role.js";
import { ProductController } from "../controllers/Product.js";

const ProductCrudRouter = Router();

ProductCrudRouter.post(
  "/",
  authenticateToken,
  role("admin"),
  ProductController.createByJson
);

ProductCrudRouter.put(
  "/:id",
  authenticateToken,
  role("admin"),
  ProductController.updateByJson
);

ProductCrudRouter.delete(
  "/:id",
  authenticateToken,
  role("admin"),
  ProductController.deleteById
);


export default ProductCrudRouter;
