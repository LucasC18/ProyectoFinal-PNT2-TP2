import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { apiReference } from "@scalar/api-reference";

import router from "./src/router/index.js";

const server = express();

// Necesario para usar __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares base
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

// -----------------------------
// 📌 SERVIR openapi.yml
// -----------------------------
server.get("/docs/openapi.yml", (req, res) => {
  const filePath = path.join(__dirname, "openapi.yml");
  return res.sendFile(filePath);
});

// -----------------------------
// 📌 UI de documentación con Scalar
// -----------------------------
server.get("/openapi", async (req, res) => {
  try {
    const yamlContent = fs.readFileSync(
      path.join(__dirname, "openapi.yml"),
      "utf8"
    );

    const html = await apiReference({
      theme: "default",
      spec: {
        content: yamlContent,
        format: "yaml"
      }
    });

    res.setHeader("Content-Type", "text/html");
    return res.send(html);
  } catch (error) {
    console.error("Error cargando documentación:", error);
    return res.status(500).send("Error al cargar documentación");
  }
});

// -----------------------------
// 📌 Rutas de tu API
// -----------------------------
server.use("/api/v1", router);

// -----------------------------
// 📌 Server online
// -----------------------------
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Servidor corriendo en puerto:", PORT);
});

export default server;
