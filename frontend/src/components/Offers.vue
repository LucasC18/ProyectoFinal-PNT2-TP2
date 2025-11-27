<template>
  <section class="offers py-5">
    <div class="container text-center">
      <h2 class="fw-bold mb-4 text-success">Ofertas Exclusivas</h2>

      <div class="row g-4">
        <div v-for="p in ofertas" :key="p.id" class="col-md-4">
          <div class="card border-0 shadow-sm h-100">

            <img :src="p.img" class="product-img" />

            <div class="card-body d-flex flex-column justify-content-between">

              <div>
                <h5 class="fw-semibold">{{ p.nombre }}</h5>

                <p class="text-muted text-decoration-line-through">
                  ${{ p.precioOriginal }}
                </p>

                <p class="text-success fw-bold">
                  ${{ p.precioFinal }}
                </p>
              </div>

              <button
                class="btn btn-success mt-3"
                @click="agregarAlCarrito(p)"
              >
                Agregar al carrito
              </button>

            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const ofertas = ref([])

onMounted(async () => {
  try {
    const resp = await fetch("http://localhost:3000/api/v1/products")
    const data = await resp.json()

    if (!Array.isArray(data)) {
      console.error("La API no devolvió un array:", data)
      return
    }

    // 1. Ordenar por stock (menor primero)
    const ordenados = [...data].sort((a, b) => a.stock - b.stock)

    // 2. Tomar los 3 con menor stock
    const top3 = ordenados.slice(0, 3)

    // 3. Aplicar descuento del 20%
    ofertas.value = top3.map(p => {
      const descuento = 20
      const precioFinal = p.precio - p.precio * (descuento / 100)

      return {
        ...p,
        img: p.img_url,
        precioOriginal: p.precio,
        precioFinal: precioFinal.toFixed(2),
        descuento
      }
    })

  } catch (err) {
    console.error("Error cargando ofertas:", err)
  }
})

import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

function agregarAlCarrito(producto) {
  cart.addToCart({
    ...producto,
    precio: Number(producto.precioFinal),   // 👈 usar precio con descuento
  })
  alert(`"${producto.nombre}" agregado al carrito 🛒`)
}

</script>


<style scoped>

.product-img {
  width: 100%;
  height: 180px;      
  object-fit: cover;      
  object-position: center;
  border-radius: 12px 12px 0 0;
}


</style>