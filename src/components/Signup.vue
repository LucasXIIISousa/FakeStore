<template>
  <div class="login-container d-flex align-items-center justify-content-center">
    <div class="login-card">
      <img class="logo" src="../img/fav-icon.png" />

      <h2 class="text-center mb-3">Sign Up</h2>

      <form @submit.prevent="signup">
        <div class="mb-3">
          <input
            v-model="user.firstname"
            type="text"
            class="form-control"
            placeholder="First Name"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="user.lastname"
            type="text"
            class="form-control"
            placeholder="Last Name"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="user.username"
            type="text"
            class="form-control"
            placeholder="Username"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="user.email"
            type="email"
            class="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="user.phone"
            type="tel"
            class="form-control"
            placeholder="Phone Number"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="user.city"
            type="text"
            class="form-control"
            placeholder="City"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="user.street"
            type="text"
            class="form-control"
            placeholder="Street"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="user.number"
            type="number"
            class="form-control"
            placeholder="House Number"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="user.zipcode"
            type="text"
            class="form-control"
            placeholder="ZIP Code"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block w-100">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
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
    };
  },
  methods: {
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
        const response = await fetch('https://fakestoreapi.com/users', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();

        if (response.ok) {
          localStorage.setItem('token', btoa(this.user.email + ':' + this.user.password)); // Simula token
          this.$router.push('/users'); // Redireciona para a página de usuários
        } else {
          console.error('Error creating user:', result);
        }
      } catch (error) {
        console.error('Error during signup:', error);
        alert('Signup failed! Please try again.');
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
