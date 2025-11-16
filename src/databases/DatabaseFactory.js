import { config } from '../config/config.js';
import SupaBaseConnection from './supabase.cnx.js';

export default class DatabaseFactory {
  static async getConnection() {
    if (config.DATABASE !== 'supabase') {
      throw new Error('Este proyecto solo soporta Supabase.');
    }

    return SupaBaseConnection.connect();
  }
}
