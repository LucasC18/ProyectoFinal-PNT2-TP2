🛍️ Tienda Virtual - Proyecto Final (Frontend + Backend)
📋 Descripción general

Tienda Virtual es una aplicación web desarrollada como trabajo integrador de la materia NT2 – TP Final.
Permite visualizar productos de ropa, navegar entre secciones, y próximamente contará con autenticación de usuarios, carrito de compras y conexión a una API RESTful para persistir datos.

Este proyecto implementa Vue 3 (CLI/Vite) en el frontend y contará con un backend en Node.js + Express + JWT + MongoDB/MySQL.

🚀 Tecnologías utilizadas
🖥️ Frontend

Vue.js 3
 – Framework principal

Vue Router
 – Sistema de rutas SPA

Bootstrap 5
 – Framework CSS

Axios
 – Cliente HTTP para consumir API

Vite
 – Bundler y servidor de desarrollo

[HTML5, CSS3, JS (ES6+)] – Base del frontend moderno

⚙️ Backend (en desarrollo)

Node.js + Express

JWT (JSON Web Tokens)

Bcrypt (encriptación de contraseñas)

Base de datos (MongoDB o MySQL)

Swagger / Scalar (documentación de endpoints)

📂 Estructura del proyecto
TiendaVirtual/
│
├── backend/              # (en desarrollo)
│   ├── src/
│   ├── package.json
│   └── ...
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/           # Imágenes, estilos
    │   ├── components/       # Componentes Vue reutilizables
    │   │   ├── Navbar.vue
    │   │   ├── ProductCard.vue
    │   │   ├── ProductList.vue
    │   │   ├── Home.vue
    │   │   ├── Contact.vue
    │   │   └── Products.vue
    │   ├── routes.js         # Configuración de rutas (Vue Router)
    │   ├── main.js           # Punto de entrada principal
    │   └── App.vue           # Layout principal
    ├── package.json
    └── README.md

⚙️ Instalación y ejecución
🔧 Requisitos previos

Node.js (v18 o superior)

npm o yarn

▶️ Pasos para correr el frontend
# 1. Clonar el repositorio
git clone [https://github.com/usuario/tienda-virtual.git](https://github.com/LucasC18/ProyectoFinal-PNT2-TP2/tree/main)

# 2. Entrar al proyecto frontend
cd TiendaVirtual/frontend

# 3. Instalar dependencias
npm install

# 4. Ejecutar el servidor de desarrollo
npm run dev


Luego abrí en tu navegador:
👉 http://localhost:5173

🌐 Navegación
Ruta	Componente	Descripción
/home	Home.vue	Página de inicio con presentación de la tienda
/products	Products.vue	Muestra el listado de productos (máx. 20)
/contact	Contact.vue	Formulario de contacto simple
🎨 Características principales

✅ SPA (Single Page Application)

✅ Navegación con Vue Router

✅ Estilo responsive con Bootstrap 5

✅ Componentes dinámicos (ProductCard, ProductList, Navbar)

✅ Estructura modular lista para escalar

✅ Código limpio y compatible con Vue 3

🔜 Próximas implementaciones (Backend)

🔐 Autenticación y roles (JWT + bcrypt)

🧩 API RESTful con Node.js + Express

🗃️ Base de datos persistente (MongoDB / MySQL)

💬 Módulo de comentarios y reseñas

💰 Carrito de compras y checkout

📊 Estadísticas e informes

🧾 Documentación con Swagger / Scalar

☁️ Despliegue en Cloud Run o Render

🧠 Temas aplicados (según consigna NT2)

Vue CLI 3 / Vue 3 con Vite

Framework CSS (Bootstrap 5)

Componentes de archivo único

Métodos y propiedades computadas

Directivas (v-if, v-for, v-model, v-bind, v-on, :class, :style)

Lifecycle hooks (created, mounted)

Manejo de Props y eventos

Formularios con validaciones

Routeo de componentes con parámetros

API REST mediante Axios (async/await)

Patrón de estado global (Vuex - próximamente)
