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
 

const server = express();

// Middlewares básicos
server.use(morgan('dev'));
server.use(express.json());


const allowedOrigins = [process.env.FRONTEND_ORIGIN || 'http://localhost:5173'];
server.use(cors({
  origin: (origin, callback) => {
    // permitir requests sin origin o del frontend
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','POST','PATCH','PUT','DELETE','OPTIONS'],
  credentials: true,
}));


 
// src/server.js (reemplazá la línea actual)
server.use('/openapi.yml', express.static(path.join(process.cwd(), 'docs', 'openapi.yml')));
server.use('/docs',
  apiReference({
    theme: 'purple',
    url: '/openapi.yml',
  }),
);



// Rutas
server.use('/api/v1/products', ProductAllRouter); // lista de productos
server.use('/api/v1/product', ProductRouter);
server.use('/api/v1/users', UserAllRouter);
server.use('/api/v1/user', UserRouter);

// Manejo 404
server.use(notFoundHandler);

 

export default server;
