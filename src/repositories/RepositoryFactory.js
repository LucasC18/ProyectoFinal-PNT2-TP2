import { config } from '../config/config.js';
import ProductRepositorySupabase from './Product.Supabase.Repository.js';

export class RepositoryFactory {
  static createRepositoryProvider() {
    return new ProductRepositorySupabase();
  }

  static getRepository() {
    const databaseType = config.DATABASE == 'supabase';

    return RepositoryFactory.createRepositoryProvider(databaseType);
  }
}
