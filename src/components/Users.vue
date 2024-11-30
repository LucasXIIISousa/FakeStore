<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name.firstname }} {{ user.name.lastname }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      users: [],
    };
  },
  async created() {
    const response = await fetch('https://fakestoreapi.com/users');
    this.users = await response.json();
  },
};
</script>
