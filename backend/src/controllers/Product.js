import { RepositoryFactory } from '../repositories/RepositoryFactory.js';

export class ProductController {
  static async getAllProducts(req, res) {
    try {
      const repo = RepositoryFactory.getRepository();
      const productos = await repo.getAll();
      res.json(productos);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async createByJson(req, res) {
    try {
      const repo = RepositoryFactory.getRepository();
      const producto = await repo.create(req.body);
      res.json(producto);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async updateByJson(req, res) {
    try {
      const repo = RepositoryFactory.getRepository();
      const producto = await repo.update(req.body);
      res.json(producto);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async deleteById(req, res) {
    try {
      const repo = RepositoryFactory.getRepository();
      await repo.delete(req.params.id);
      res.json({ message: 'Producto eliminado' });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async getById(req, res) {
    try {
      const repo = RepositoryFactory.getRepository();
      const producto = await repo.getById(req.params.id);
      res.json(producto);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  }
}