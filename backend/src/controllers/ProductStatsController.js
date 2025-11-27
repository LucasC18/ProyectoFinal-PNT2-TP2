import ProductRepositorySupabase from '../repositories/Product.Supabase.Repository.js';

export class ProductStatsController {
  static async getStats(req, res) {
    try {
      const repo = new ProductRepositorySupabase();
      const productos = await repo.getAll();

      // Si no hay productos
      if (!productos.length) {
        return res.json({
          totalProductos: 0,
          precioPromedio: 0,
          precioMin: 0,
          precioMax: 0,
        });
      }

      const precios = productos.map(p => Number(p.precio) || 0);

      const total = productos.length;
      const precioPromedio = precios.reduce((a, b) => a + b, 0) / total;
      const precioMin = Math.min(...precios);
      const precioMax = Math.max(...precios);

      res.json({
        totalProductos: total,
        precioPromedio,
        precioMin,
        precioMax,
      });

    } catch (err) {
      console.error("❌ Error en ProductStatsController:", err);
      res.status(500).json({ error: 'Error calculando estadísticas' });
    }
  }
}
