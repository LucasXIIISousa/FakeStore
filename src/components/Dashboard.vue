<template>
    <div>
      <h1 v-if="currentUser">Welcome, {{ currentUser.username }}</h1>
      <p v-else>You are not logged in. Please <router-link to="/login">log in</router-link>.</p>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters('auth', ['currentUser']), // Obtém o usuário atual
    },
  };
  </script>
  