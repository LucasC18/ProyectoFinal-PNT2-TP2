import api from "./api";

class ProductosService {
  async getAll() {
    const { data } = await api.get("/v1/products");
    return data;
  }

  async create(producto) {
    const { data } = await api.post("/v1/product/create", producto);
    return data;
  }
async update(id, producto) {
  const { data } = await api.patch(`/v1/product/update/${id}`, producto);
  return data;
}

  async delete(id) {
    const { data } = await api.delete(`/v1/product/delete/${id}`);
    return data;
  }
}

export default new ProductosService();
``

