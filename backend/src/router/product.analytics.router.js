import { Router } from "express";
import { ProductAnalyticsController } from "../controllers/ProductAnalytics.js";
import { authenticateToken } from "../middleware/authentication.js";

const ProductAnalyticsRouter = Router();

ProductAnalyticsRouter.get('/analytics/prices', authenticateToken, ProductAnalyticsController.priceDistribution);

export default ProductAnalyticsRouter;
