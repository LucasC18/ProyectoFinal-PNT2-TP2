import express from "express";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

import router from "./router/index.js";
import { apiReference } from "@scalar/express-api-reference";

const server = express();

// Necesario para __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============ Seguridad / Middlewares ============
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
});
server.use(limiter);

// ============ Servir OpenAPI ============
server.use(
  "/openapi.yml",
  express.static(path.join(process.cwd(), "openapi.yml"))
);

// ============ Documentación Scalar ============
server.use(
  "/docs",
  apiReference({
    theme: "purple",
    url: "/openapi.yml",
  })
);

// ============ Rutas API ============
server.use("/api/v1", router);

// ============ Levantar servidor ============
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto: ${PORT}`);
});

export default server;
