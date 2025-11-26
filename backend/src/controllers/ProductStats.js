import ProductRepositorySupabase from '../repositories/Product.Supabase.Repository.js';

export class ProductStatsController {
  static async getStats(req, res) {
    try {
      const repo = new ProductRepositorySupabase();
      const productos = await repo.getAll();

      const total = productos.length;
      const precioPromedio = productos.reduce((a, p) => a + p.precio, 0) / total;
      const precioMin = Math.min(...productos.map((p) => p.precio));
      const precioMax = Math.max(...productos.map((p) => p.precio));

      res.json({
        totalProductos: total,
        precioPromedio,
        precioMin,
        precioMax,
      });
    } catch (err) {
      res.status(500).json({ error: 'Error calculando estadísticas' });
    }
  }
}
