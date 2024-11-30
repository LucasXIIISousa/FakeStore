<template>
  <div class="login-container d-flex align-items-center justify-content-center">
    <div class="login-card">
      <img class="logo" src="../img/fav-icon.png" />

      <h2 class="text-center mb-3">Sign Up</h2>

      <form @submit.prevent="signup">
        <!-- First Name -->
        <div class="mb-3">
          <input
            v-model="user.firstname"
            type="text"
            class="form-control"
            placeholder="First Name"
            required
          />
        </div>

        <!-- Last Name -->
        <div class="mb-3">
          <input
            v-model="user.lastname"
            type="text"
            class="form-control"
            placeholder="Last Name"
            required
          />
        </div>

        <!-- Username -->
        <div class="mb-3">
          <input
            v-model="user.username"
            type="text"
            class="form-control"
            placeholder="Username"
            required
          />
        </div>

        <!-- Email -->
        <div class="mb-3">
          <input
            v-model="user.email"
            type="email"
            class="form-control"
            placeholder="Email"
            required
          />
        </div>

        <!-- Phone Number -->
        <div class="mb-3">
          <input
            v-model="user.phone"
            type="tel"
            class="form-control"
            placeholder="Phone Number"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-3">
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>

        <!-- City -->
        <div class="mb-3">
          <input
            v-model="user.city"
            type="text"
            class="form-control"
            placeholder="City"
            required
          />
        </div>

        <!-- Street -->
        <div class="mb-3">
          <input
            v-model="user.street"
            type="text"
            class="form-control"
            placeholder="Street"
            required
          />
        </div>

        <!-- House Number -->
        <div class="mb-3">
          <input
            v-model="user.number"
            type="number"
            class="form-control"
            placeholder="House Number"
            required
          />
        </div>

        <!-- ZIP Code -->
        <div class="mb-3">
          <input
            v-model="user.zipcode"
            type="text"
            class="form-control"
            placeholder="ZIP Code"
            required
          />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary btn-block w-100">Sign Up</button>
      </form>

      <!-- Feedback Messages -->
      <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Signup',
  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        city: '',
        street: '',
        number: '',
        zipcode: '',
      },
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    ...mapActions('auth', ['register']), // Mapeia a ação Vuex do módulo auth
    async signup() {
      const userData = {
        email: this.user.email,
        username: this.user.username,
        password: this.user.password,
        name: {
          firstname: this.user.firstname,
          lastname: this.user.lastname,
        },
        address: {
          city: this.user.city,
          street: this.user.street,
          number: this.user.number,
          zipcode: this.user.zipcode,
        },
        phone: this.user.phone,
      };

      try {
        // Chama a ação Vuex para registrar o usuário
        await this.register(userData);

        // Exibe mensagem de sucesso e redireciona
        this.successMessage = 'Registration successful! Redirecting...';
        this.errorMessage = '';
        setTimeout(() => this.$router.push('/dashboard'), 2000); // Redireciona após 2 segundos
      } catch (error) {
        // Exibe mensagem de erro
        this.errorMessage = 'Registration failed. Please try again.';
        this.successMessage = '';
      }
    },
  },
};
</script>

<style scoped>
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
</style>
