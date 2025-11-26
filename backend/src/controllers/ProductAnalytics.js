import ProductRepositorySupabase from '../repositories/Product.Supabase.Repository.js';

export class ProductAnalyticsController {
  static async priceDistribution(req, res) {
    try {
      const repo = new ProductRepositorySupabase();
      const productos = await repo.getAll();

      const grupos = {
        baratos: productos.filter((p) => p.precio < 10000).length,
        medios: productos.filter((p) => p.precio >= 10000 && p.precio < 50000).length,
        caros: productos.filter((p) => p.precio >= 50000).length,
      };

      res.json(grupos);
    } catch (err) {
      res.status(500).json({ error: 'Error generando análisis' });
    }
  }
}
