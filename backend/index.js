import { config } from "./src/config/config.js";
import DatabaseFactory from "./src/databases/DatabaseFactory.js";
import server from "./src/server.js";

async function runServer() {
  try {
    console.log("🚀 Iniciando servidor...");

    if (config.DATABASE === "supabase") {
      console.log("🔌 Conectando a Supabase...");
      DatabaseFactory.getConnection();
    }

    console.log("✔ Backend inicializado correctamente");

  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
}

runServer();

// 👉 Exportar server para que Vercel lo use
export default server;
