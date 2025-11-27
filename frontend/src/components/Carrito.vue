<script setup>
import { useCartStore } from '@/stores/cart'
import { computed, ref } from 'vue'
import axios from 'axios'

const cart = useCartStore()
const items = cart.items

function eliminar(index) {
  cart.remove(index)
}

function actualizarCantidad(item, event) {
  cart.updateCantidad(item, Number(event.target.value))
}

const total = computed(() => cart.total)

const mensaje = ref("")

async function finalizarCompra() {
  try {
    const payload = {
      productos: cart.items.map(item => ({
        producto_id: item.id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        subtotal: item.precio * item.cantidad
      })),
      total: cart.total,
      fecha: new Date().toISOString()
    }

    await axios.post("https://690beb956ad3beba00f68e06.mockapi.io/compras", payload)

    mensaje.value = "Compra realizada con éxito 🎉"

    cart.clear()

  } catch (err) {
    console.error(err)
    mensaje.value = "Error al procesar la compra ❌"
  }
}
</script>

<template>
  <section class="carrito py-5">
    <div class="container">
      <h2 class="fw-bold text-success text-center mb-4">Tu Carrito</h2>

      <!-- SI YA FINALIZÓ LA COMPRA, MOSTRAR SOLO MENSAJE -->
      <div v-if="mensaje">
        <div class="alert alert-success mt-3">
          {{ mensaje }}
        </div>
      </div>

      <!-- SI NO HAY MENSAJE, MOSTRAR CARRITO NORMAL -->
      <div v-else>

        <!-- SI HAY PRODUCTOS -->
        <div v-if="items.length" class="table-responsive">

          <table class="table align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, i) in items" :key="i">
                <td>{{ item.nombre }}</td>
                <td>${{ item.precio }}</td>

                <td>
                  <input
                    type="number"
                    min="1"
                    :max="item.stock"
                    :value="item.cantidad"
                    @change="actualizarCantidad(item, $event)"
                    class="form-control w-50"
                  />
                </td>

                <td>${{ (item.precio * item.cantidad).toFixed(2) }}</td>

                <td>
                  <button @click="eliminar(i)" class="btn btn-sm btn-outline-danger">✕</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="text-end fw-bold fs-5 mt-3">
            Total: ${{ total }}
          </div>

          <div class="text-end mt-3">
            <button class="btn btn-success" @click="finalizarCompra">
              Finalizar Compra
            </button>
          </div>

        </div>

        <!-- CUANDO EL CARRITO QUEDA VACÍO -->
        <div v-else class="text-center text-muted mt-5">
          <h4 class="mb-3">Total: $0.00</h4>
          Tu carrito está vacío 🛒
        </div>

      </div>
    </div>
  </section>
</template>

