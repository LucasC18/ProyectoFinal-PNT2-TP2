import { config } from './src/config/config.js';
import DatabaseFactory from './src/databases/DatabaseFactory.js';

import server from './src/server.js';

// ⚠️ Vercel NO permite app.listen(), así que se deja comentado
// y simplemente exportamos el server como handler serverless.

const runServer = async () => {
  try {
    if (config.DATABASE == 'supabase') {
      DatabaseFactory.getConnection();
    }

    // ❌ Vercel no admite esto, lo comento:
    /*
    server.listen(
      config.SERVER_PORT,
      config.SERVER_HOST,
      console.log(`
                Server is running at: http://${config.SERVER_HOST}:${config.SERVER_PORT}
            `),
    );
    */
  } catch (error) {
    console.log(`Error en el server`, error.message);
  }
};

runServer();

// ✅ Para Vercel: exportamos el handler por defecto
export default server;
