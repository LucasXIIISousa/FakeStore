<template>
  <div class="login-container d-flex align-items-center justify-content-center">
    <div class="login-card">
      <!-- Logo -->
      <img class="logo" src="../img/fav-icon.png" />

      <!-- Título -->
      <h2 class="text-center mb-3">Sign in</h2>

      <!-- Formulário -->
      <form @submit.prevent="login">
        <div class="mb-3">
          <input
            v-model="user.username"
            type="text"
            class="form-control"
            placeholder="Username or Email"
            required
          />
        </div>
        <div class="mb-4">
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block w-100">Login</button>
      </form>

      <!-- Mensagem de erro -->
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>

      <!-- Opções de Login Social -->
      <div class="divider mt-4">
        <span>or continue with</span>
      </div>
      <div class="social-login mt-3 d-flex justify-content-center">
        <button
          class="btn btn-outline-secondary mx-2"
          @click="loginWith('google')"
        >
          <i class="fab fa-google"></i>
        </button>
      </div>

      <!-- Link para a página de Signup -->
      <p class="mt-3">
        Don't have an account? 
        <router-link to="/signup">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      errorMessage: '', // Armazena mensagens de erro
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    async login() {
      try {
        // Tentativa de login
        await this.login(this.user);
        // Redireciona para a página inicial após o login
        this.$router.push('/');
      } catch (error) {
        // Se falhar, exibe uma mensagem e redireciona para Signup
        this.errorMessage = 'User not found. Redirecting to Sign Up.';
        setTimeout(() => this.$router.push('/signup'), 2000); // Redireciona após 2s
      }
    },
    loginWith(provider) {
      alert(`Logging in with ${provider}`);
      // Placeholder para integração futura
    },
  },
};
</script>

<style scoped>
/* Estilos principais */
.login-container {
  height: 100vh;
  background: #f7f7f7;
}
.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}
.logo {
  width: 120px;
  display: block;
  margin: 0 auto;
}
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
}
.divider span {
  flex: 1;
  font-size: 14px;
  color: #777;
  position: relative;
}
.divider span:before,
.divider span:after {
  content: '';
  flex: 1;
  height: 1px;
  background: #ddd;
  margin: 0 10px;
}
.social-login button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
p {
  font-size: 14px;
}
router-link {
  color: #007bff;
  text-decoration: none;
}
router-link:hover {
  text-decoration: underline;
}
</style>
