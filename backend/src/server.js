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
import ProductStatsRouter from "./router/product.stats.router.js";
import ProductAnalyticsRouter from "./router/product.analytics.router.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const server = express();

// Middlewares básicos
server.use(morgan('dev'));
server.use(express.json());

// ⚠️ En Vercel NO podés fijar un origin local fijo
// porque el backend va a correr en un dominio público.
server.use(
  cors({
    origin: '*',  // ✔️ Lo abrimos para que funcione desde tu frontend deployado
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  }),
);

// ⚠️ Vercel sí soporta archivos estáticos, pero require rutas absolutas
server.use('/openapi.yml', express.static(path.join(process.cwd(), 'docs', 'openapi.yml')));

// 📌 Documentación Scalar (Swagger-like)
server.use(
  '/docs',
  apiReference({
    theme: 'purple',
    // ⚠️ En producción debe ser ruta absoluta desde Vercel
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
server.use(express.static('public'));


// Manejo 404
server.use(notFoundHandler);

// Seguridad + rate limit
server.use(helmet());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

server.use(limiter);

export default server;
