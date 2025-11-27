import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  getters: {
    total: (state) =>
      state.items.reduce((acc, p) => acc + p.precio * p.cantidad, 0).toFixed(2),

    cantidadTotal: (state) =>
      state.items.reduce((acc, p) => acc + p.cantidad, 0)
  },

  actions: {
    addToCart(producto) {
      const existe = this.items.find(p => p.id === producto.id)

      if (existe) {
        if (existe.cantidad < existe.stock) {
          existe.cantidad++
        } else {
          alert(`Solo hay ${existe.stock} unidades disponibles`)
        }
        return
      }
     
      // si no existe → agregarlo con cantidad 1
     this.items.push({
  id: producto.id,
  nombre: producto.nombre,
  precio: producto.precio,              // 👈 PRECIO CON DESCUENTO YA CALCULADO
  precioOriginal: producto.precioOriginal,  
  tieneDescuento: producto.tieneDescuento,
  stock: producto.stock,                // 👈 NECESARIO PARA validar stock
  cantidad: 1
})

    },

    clear() {
  this.items = [];
    },


    remove(index) {
      this.items.splice(index, 1)
    },

    updateCantidad(item, nuevaCantidad) {
      if (nuevaCantidad > item.stock) {
        item.cantidad = item.stock
        alert(`No podés superar las ${item.stock} unidades`)
      } else if (nuevaCantidad < 1) {
        item.cantidad = 1
      } else {
        item.cantidad = nuevaCantidad
      }
    }
  }
})