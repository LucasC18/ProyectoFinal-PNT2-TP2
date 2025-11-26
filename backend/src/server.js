import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { apiReference } from "@scalar/express-api-reference";
import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";

// Rutas
import ProductAllRouter from "./router/product.all.router.js";
import ProductCrudRouter from "./router/product.crud.router.js";
import ProductStatsRouter from "./router/product.stats.router.js";
import ProductAnalyticsRouter from "./router/product.analytics.router.js";
import UserAllRouter from "./router/user.all.router.js";
import UserCrudRouter from "./router/user.crud.router.js";
import AuthRouter from "./router/auth.router.js";

// Middlewares
import notFoundHandler from "./middleware/notFoundHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

// 📌 Middlewares base
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(helmet());

// 📌 Rate limit
server.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: "Demasiadas solicitudes, intente más tarde."
  })
);

// 📌 Documentación OpenAPI/Scalar
server.use(
  "/openapi",
  apiReference({
    theme: "kepler",
    layout: "modern",
    hideDownloadButton: true,
    specPath: path.join(__dirname, "../docs/openapi.yml")
  })
);

// 📌 Rutas API
server.use("/api/v1/auth", AuthRouter);

server.use("/api/v1/products", ProductAllRouter);
server.use("/api/v1/products/crud", ProductCrudRouter);
server.use("/api/v1/products/stats", ProductStatsRouter);
server.use("/api/v1/products/analytics", ProductAnalyticsRouter);

server.use("/api/v1/users", UserAllRouter);
server.use("/api/v1/users/crud", UserCrudRouter);

// 🔚 Middleware Not Found
server.use(notFoundHandler);

server.get("/openapi", (req, res) => {
  const spec = fs.readFileSync(
    path.join(__dirname, "../docs/openapi.yml"),
    "utf8"
  );

  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>API Docs</title>
      <meta charset="utf-8" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scalar/express-api-reference/styles.css" />
    </head>
    <body>
      <div id="api-reference"></div>
      <script type="module">
        import ApiReference from "https://cdn.jsdelivr.net/npm/@scalar/express-api-reference/dist/browser.js";
        ApiReference({
          element: "#api-reference",
          spec: \`${spec}\`,
          theme: "kepler"
        });
      </script>
    </body>
  </html>
  `);
});


export default server;
