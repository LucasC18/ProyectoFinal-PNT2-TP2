import express from "express";

import ProductAllRouter from "./product.all.router.js";
import ProductCrudRouter from "./product.crud.router.js";
import ProductStatsRouter from "./product.stats.router.js";
import ProductAnalyticsRouter from "./product.analytics.router.js";

import AuthRouter from "./auth.router.js";

import UserAllRouter from "./user.all.router.js";
import UserCrudRouter from "./user.crud.router.js";

const router = express.Router();

// -------------------------------
// 🔥 Agrupar todas las rutas acá
// -------------------------------

// Productos
router.use("/products", ProductAllRouter);  // GET /products
router.use("/products", ProductCrudRouter); // POST, PUT, DELETE /products
router.use("/products/stats", ProductStatsRouter);
router.use("/products/analytics", ProductAnalyticsRouter);


// Usuarios & Auth
router.use("/auth", AuthRouter);
router.use("/users", UserAllRouter);
router.use("/users/crud", UserCrudRouter);

export default router;
