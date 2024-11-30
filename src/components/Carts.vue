<template>
  <div>
    <h1>Cart</h1>
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price * item.quantity }}</td>
          <td>
            <button @click="removeFromCart(item.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('carts', ['cartItems']),
  },
  methods: {
    ...mapActions('carts', ['removeFromCart']),
  },
};
</script>
