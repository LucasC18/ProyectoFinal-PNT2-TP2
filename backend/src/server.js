// src/server.js
import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import ProductAllRouter from './router/product.all.router.js';
import ProductRouter from './router/product.crud.router.js';
import UserAllRouter from './router/user.all.router.js';
import UserRouter from './router/user.crud.router.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import { apiReference } from '@scalar/express-api-reference';
import path from 'path';
import AuthRouter from './router/auth.router.js';
import ProductStatsRouter from "./router/product.stats.router.js"; // Crud mas complejo
import ProductAnalyticsRouter from "./router/product.analytics.router.js"; // Crud mas complejo
import helmet from "helmet";
import rateLimit from "express-rate-limit";



const server = express();

// Middlewares básicos
server.use(morgan('dev'));
server.use(express.json());

server.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  }),
);

server.use('/openapi.yml', express.static(path.join(process.cwd(), 'docs', 'openapi.yml')));
server.use(
  '/docs',
  apiReference({
    theme: 'purple',
    url: '/openapi.yml',
  }),
);

// Rutas
server.use('/api/v1/products', ProductAllRouter);
server.use('/api/v1/product', ProductRouter);
server.use('/api/v1/users', UserAllRouter);
server.use('/api/v1/user', UserRouter);
server.use('/api/v1/auth', AuthRouter);
server.use('/api/v1/products', ProductStatsRouter);
server.use('/api/v1/products', ProductAnalyticsRouter);

// Manejo 404
server.use(notFoundHandler);

// Rate Limit
server.use(helmet());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

server.use(limiter);



export default server;

