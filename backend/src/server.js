import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { apiReference } from "@scalar/express-api-reference";

import router from "./router/index.js";
import ProductAllRouter from "./router/product.all.router.js";
import ProductRouter from "./router/product.crud.router.js";
import UserAllRouter from "./router/user.all.router.js";
import UserRouter from "./router/user.crud.router.js";
import AuthRouter from "./router/auth.router.js";
import ProductStatsRouter from "./router/product.stats.router.js";
import ProductAnalyticsRouter from "./router/product.analytics.router.js";

// Necesitamos __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

// ------------------------------------------------------
// 📌 Servir el openapi.yml (Vercel busca desde index.js)
// ------------------------------------------------------
server.use(
  "/openapi.yml",
  express.static(path.join(__dirname, "..", "openapi.yml"))
);

// ------------------------------------------------------
// 📌 UI de documentación Scalar
// ------------------------------------------------------
server.use(
  "/docs",
  apiReference({
    theme: "purple",
    url: "/openapi.yml",
  })
);

// ------------------------------------------------------
// 📌 Tus rutas reales de API
// ------------------------------------------------------
server.use("/api/v1", router);
server.use('/api/v1/products', ProductAllRouter);
server.use('/api/v1/product', ProductRouter);
server.use('/api/v1/users', UserAllRouter);
server.use('/api/v1/user', UserRouter);
server.use('/api/v1/auth', AuthRouter);
server.use('/api/v1/products', ProductStatsRouter);
server.use('/api/v1/products', ProductAnalyticsRouter);

// Solo hacemos server.listen() en desarrollo (local)
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

export default server;
