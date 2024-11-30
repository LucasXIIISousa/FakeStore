<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <strong>{{ user.name.firstname }} {{ user.name.lastname }}</strong> - 
        {{ user.email }} ({{ user.phone }})
        <button @click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Users',
  computed: {
    ...mapGetters(['allUsers']),
  },
  methods: {
    ...mapActions(['fetchUsers', 'deleteUser']),
  },
  created() {
    this.fetchUsers();
  },
};
</script>
