import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiReference } from '@scalar/express-api-reference';

import router from './router/index.js';

// Necesitamos __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

// ------------------------------------------------------
// 📌 Servir el openapi.yml (Vercel busca desde index.js)
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

// ------------------------------------------------------
// 📌 Tus rutas reales de API
// ------------------------------------------------------
server.use('/api/v1', router);

// Solo hacemos server.listen() en desarrollo (local)
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

export default server;
