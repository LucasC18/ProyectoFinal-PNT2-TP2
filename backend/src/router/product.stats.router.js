import { Router } from 'express';
import { ProductStatsController } from '../controllers/ProductStats.js';
import { authenticateToken } from '../middleware/authentication.js';

const ProductStatsRouter = Router();

ProductStatsRouter.get('/stats', authenticateToken, ProductStatsController.getStats);

export default ProductStatsRouter;
