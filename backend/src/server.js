import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiReference } from '@scalar/express-api-reference';
import { rateLimit } from 'express-rate-limit';

import router from './router/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 50,                
  message: {
    error: 'Too many requests. Please try again later.',
  },
});

server.use('/api', limiter);

// ------------------------------------------------------
// 📌 Servir openapi.yml (para Scalar y Vercel)
// ------------------------------------------------------
server.use('/openapi.yml', express.static(path.join(__dirname, '..', 'openapi.yml')));

// ------------------------------------------------------
// 📌 UI de documentación Scalar
// ------------------------------------------------------
server.use(
  '/docs',
  apiReference({
    theme: 'purple',
    url: '/openapi.yml',
  }),
);


server.use('/api/v1', router);


if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

export default server;

