<template>
  <section class="contact py-5">
    <div class="container text-center">
      <h2 class="fw-bold mb-4 text-dark">Contáctanos</h2>

      <form novalidate @submit.prevent="enviar" class="mx-auto" style="max-width: 500px;">

        <div class="mb-3 text-start">
          <input
            v-model.trim="formData.nombre"
            @input="formDirty.nombre = true"
            type="text"
            class="form-control"
            placeholder="Tu nombre"
          />
          <div v-if="errorNombre.mostrar" class="alert alert-danger my-1 p-2">
            {{ errorNombre.mensaje }}
          </div>
        </div>
        <div class="mb-3 text-start">
          <input
            v-model.trim="formData.email"
            @input="formDirty.email = true"
            type="email"
            class="form-control"
            placeholder="Tu email"
          />
          <div v-if="errorEmail.mostrar" class="alert alert-danger my-1 p-2">
            {{ errorEmail.mensaje }}
          </div>
        </div>

        <div class="mb-3 text-start">
          <textarea
            v-model.trim="formData.mensaje"
            @input="formDirty.mensaje = true"
            class="form-control"
            placeholder="Tu mensaje..."
            rows="4"
          ></textarea>
          <div v-if="errorMensaje.mostrar" class="alert alert-danger my-1 p-2">
            {{ errorMensaje.mensaje }}
          </div>
        </div>

        <button :disabled="estadoBotonDeshabilitado()" class="btn btn-success w-100 text-white">
          Enviar
        </button>
      </form>
      <div
        v-if="mensaje"
        class="mt-3 fw-semibold"
        :class="{ 'text-success': exito, 'text-danger': !exito }"
      >
        {{ mensaje }}
      </div>
    </div>
  </section>
</template>

<script>
import ContactService from "../services/contactService";

export default {
  name: "Contact",
 

  data() {
    return {
      formData: this.getInicialData(),
      formDirty: this.getInicialData(),
      mensaje: "",
      exito: false
    };
  },

  computed: {
    errorNombre() {
      let mensaje = "";
      const v = this.formData.nombre;

      if (!v) mensaje = "Campo requerido";
      else if (v.length < 3) mensaje = "Debe tener al menos 3 caracteres";

      return { mensaje, mostrar: mensaje && this.formDirty.nombre, ok: !mensaje };
    },

    errorEmail() {
      let mensaje = "";
      const v = this.formData.email;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!v) mensaje = "Email requerido";
      else if (!regex.test(v)) mensaje = "Formato inválido";

      return { mensaje, mostrar: mensaje && this.formDirty.email, ok: !mensaje };
    },
    errorMensaje() {
      let mensaje = "";
      const v = this.formData.mensaje;

      if (!v) mensaje = "Debes escribir un mensaje";
      else if (v.length < 10) mensaje = "Debe tener al menos 10 caracteres";

      return { mensaje, mostrar: mensaje && this.formDirty.mensaje, ok: !mensaje };
    },
  },

  methods: {
    getInicialData() {
      return {
        nombre: null,
        email: null,
        mensaje: null
      };
    },

    estadoBotonDeshabilitado() {
      return !(
        this.errorNombre.ok &&
        this.errorEmail.ok &&
        this.errorMensaje.ok
      );
    },

   async enviar() {
  if (this.estadoBotonDeshabilitado()) {
    this.exito = false;
    this.mensaje = "Corrige los errores antes de enviar";
    return;
  }

  try {
    await ContactService.enviarMensaje(this.formData);

    this.exito = true;
    this.mensaje = "Mensaje enviado correctamente ✔️";

    this.formData = this.getInicialData();
    this.formDirty = this.getInicialData();
  } catch (error) {
    this.exito = false;
    this.mensaje = "Error al enviar el mensaje ❌";
    console.error(error);
  }
}
  }
};
</script>


