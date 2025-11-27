<template>
  <footer class="footer mt-5 pt-5 pb-4">
    <div class="container">
      <div class="row gy-4">
        <div class="col-md-4">
          <h5 class="fw-bold text-success">TiendaVirtual</h5>
          <p class="text-muted">
            Tu tienda de moda online. Las mejores marcas, los mejores precios.
          </p>
        </div>


        <div class="col-md-4">
          <h6 class="fw-semibold mb-3">Tienda</h6>
          <ul class="list-unstyled text-muted">
            <li><RouterLink to="/products" class="link">Todos los productos</RouterLink></li>
            <li><RouterLink to="/offers" class="link">Ofertas</RouterLink></li>
            <li><RouterLink to="/novedades" class="link">Novedades</RouterLink></li>
          </ul>
        </div>

        <div class="col-md-4">
          <h6 class="fw-semibold mb-3">Atención al cliente</h6>
          <ul class="list-unstyled text-muted">
            <li><RouterLink to="/contact" class="link">Contacto</RouterLink></li>
            <li><RouterLink to="/contact" class="link">Envíos</RouterLink></li>
            <li><RouterLink to="/contact" class="link">Devoluciones</RouterLink></li>
          </ul>
        </div>
      </div>

      <hr class="my-4 text-muted" />
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f2f5f3;
  color: #333;
}
.link {
  text-decoration: none;
  color: #6c757d;
  transition: 0.2s;
}
.link:hover {
  color: #4caf50;
}
</style>
