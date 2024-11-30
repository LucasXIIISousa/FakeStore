<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top" ref="navbar">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Store Dashboard</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Overview</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">Products</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/carts">Carts</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/users">Users</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Conteúdo Principal -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // Lógica para esconder/mostrar a navbar com base no scroll
    this.$nextTick(() => {
      let lastScrollTop = 0;
      const navbar = this.$refs.navbar;

      if (navbar) {
        window.addEventListener('scroll', function () {
          let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

          if (currentScroll > lastScrollTop) {
            // Esconder a navbar ao rolar para baixo
            navbar.style.top = "-80px"; // Ajuste conforme necessário
          } else {
            // Mostrar a navbar ao rolar para cima
            navbar.style.top = "0";
          }

          lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Previne valores negativos
        });
      }
    });
  },
};
</script>

<style scoped>

/* Estilo da Navbar */
@import "./src/styles/bootstrap.css";
.navbar {
  transition: top 0.3s ease-in-out; /* Transição suave para esconder e mostrar a navbar */
  z-index: 1050; /* Garante que a navbar esteja acima de outros elementos */
}

/* Ajuste para evitar sobreposição do conteúdo */
.content {
  padding-top: 80px; /* Altura da navbar */
}

/* Personalizações adicionais */
.navbar-nav {
  margin-left: auto; /* Alinha os itens da navbar à direita */
}
</style>
