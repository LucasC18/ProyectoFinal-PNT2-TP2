import { Router } from "express";

import ProductAllRouter from "./product.all.router.js";
import ProductCrudRouter from "./product.crud.router.js";
import ProductStatsRouter from "./product.stats.router.js";
import ProductAnalyticsRouter from "./product.analytics.router.js";

import AuthRouter from "./auth.router.js";

import UserAllRouter from "./user.all.router.js";
import UserCrudRouter from "./user.crud.router.js";

const router = Router();

// Productos (orden correcto)
router.use("/products/stats", ProductStatsRouter);
router.use("/products/analytics", ProductAnalyticsRouter);
router.use("/products", ProductAllRouter);
router.use("/products", ProductCrudRouter);

// Usuarios (orden correcto)
router.use("/users", UserAllRouter);
router.use("/users", UserCrudRouter);

// Auth
router.use("/auth", AuthRouter);

export default router;
