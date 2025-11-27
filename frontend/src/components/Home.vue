<template>
  <section class="home">

    <!-- 👋 BIENVENIDO USUARIO -->
    <div v-if="userName" class="text-center mt-4">
      <h2 class="fw-bold">
        👋 Bienvenido <span class="text-success">{{ userName }}</span>
      </h2>
    </div>

    <div class="hero text-center">
      <h1 class="fw-bold mt-3">
        Descubre tu estilo con <span class="text-success">TiendaVirtual</span>
      </h1>
      <p class="text-muted mb-4">
        Las últimas tendencias en moda con descuentos de hasta 20% en productos seleccionados
      </p>

      <div class="d-flex justify-content-center gap-3">
        <RouterLink to="/products" class="btn btn-success text-white">Ver Catálogo</RouterLink>
        <RouterLink to="/offers" class="btn btn-outline-success">Ver Ofertas</RouterLink>
      </div>
    </div>

    <div class="container mt-5">
      <div class="row text-center gy-4">
        <div class="col-md-4">
          <div class="p-3 bg-white shadow-sm rounded-3">
            <h5>🚚 Envío Gratis</h5>
            <p class="text-muted mb-0">En compras mayores a $5000</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="p-3 bg-white shadow-sm rounded-3">
            <h5>🔒 Compra Segura</h5>
            <p class="text-muted mb-0">Pagos 100% protegidos y devolución total</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="p-3 bg-white shadow-sm rounded-3">
            <h5>🌿 Calidad Premium</h5>
            <p class="text-muted mb-0">Solo las mejores marcas eco-friendly</p>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <div class="productos-destacados py-5">
      <div class="container text-center">
        <h2 class="fw-bold mb-2">Productos Destacados</h2>
        <p class="text-muted mb-5">
          Las mejores prendas seleccionadas especialmente para ti
        </p>

        <div class="row g-4">
          <div
            v-for="producto in productos"
            :key="producto.id"
            class="col-md-3 d-flex align-items-stretch"
          >
            <div class="card border-0 shadow-sm h-100 position-relative">

              <div class="position-relative">
                <img :src="producto.img" class="card-img-top rounded-top" :alt="producto.nombre" />

                <div v-if="producto.descuento" class="badge-descuento position-absolute top-0 end-0 m-2">
                  -{{ producto.descuento }}%
                </div>
              </div>

              <div class="card-body d-flex flex-column justify-content-between text-start">
                <div>
                  <small class="text-uppercase text-muted">{{ producto.categoria }}</small>

                  <h5 class="fw-semibold mb-2">{{ producto.nombre }}</h5>

                  <div class="precios d-flex align-items-baseline gap-2">
                    <h5 class="fw-bold text-success mb-0">
                      ${{ producto.precioFinal.toFixed(2) }}
                    </h5>

                    <span
                      v-if="producto.precioOriginal"
                      class="text-muted text-decoration-line-through"
                    >
                      ${{ producto.precioOriginal.toFixed(2) }}
                    </span>
                  </div>
                </div>

                <div class="text-end mt-3">
                  <button class="btn btn-success" @click="agregarAlCarrito(producto)">
                    ¡Comprar!
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-5">
          <RouterLink to="/products" class="btn btn-outline-success px-4">
            Ver Todos los Productos →
          </RouterLink>
        </div>

      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const productos = ref([]);
const userName = ref(localStorage.getItem("userName")); // ✅ Ahora funciona

onMounted(async () => {
  try {
    const resp = await fetch("http://localhost:3000/api/v1/products");
    const data = await resp.json();

    if (!Array.isArray(data)) {
      console.error("La API no devolvió un array:", data)
      return
    }

    // -------------------------------
    // 1) TOP 4 MÁS NUEVOS
    // -------------------------------
    const top4Nuevos = [...data]
      .sort((a, b) => new Date(b.created_add) - new Date(a.created_add))
      .slice(0, 4)

    // -------------------------------
    // 2) TOP 3 CON MENOS STOCK
    // -------------------------------
    const top4StockBajo = [...data]
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 3)

    const idsStockBajo = top4StockBajo.map(p => p.id)

   
    productos.value = top4Nuevos.map(p => {
      const enStockBajo = idsStockBajo.includes(p.id)
      const descuento = enStockBajo ? 20 : 0

      const precioFinal = enStockBajo
        ? p.precio - p.precio * 0.20
        : p.precio

      return {
        ...p,
        img: p.img_url,
        descuento,
        precioOriginal: enStockBajo ? p.precio : null,
        precioFinal
      }
    })

  } catch (e) {
    console.error("Error cargando productos:", e);
  }
});

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




=======
>>>>>>> main
<style scoped>
.home {
  padding-top: 6rem;
  background: linear-gradient(to bottom right, #f6f8f7, #eaf4ee);
  color: #1e1e1e;
}

.badge-descuento {
  background-color: #4caf50;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 8px;
  padding: 0.3rem 0.7rem;
}

hr {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
}
</style>
