<template>
    <div class="container mt-4">
      <div v-if="product" class="card">
        <img :src="product.image" class="card-img-top" :alt="product.title" />
        <div class="card-body">
          <h2 class="card-title">{{ product.title }}</h2>
          <p class="card-text">{{ product.description }}</p>
          <p class="card-text"><strong>Price:</strong> ${{ product.price }}</p>
          <p class="card-text">
            <strong>Category:</strong> {{ product.category }}
          </p>
          <p class="card-text">
            <strong>Rating:</strong> {{ product.rating.rate }} / 5 ({{ product.rating.count }} reviews)
          </p>
          <!-- Botão para adicionar ao carrinho -->
          <button
            class="btn btn-success"
            :disabled="isAdding"
            @click="addToCartHandler(product)"
          >
            {{ isAdding ? "Adding..." : "Add to Cart" }}
          </button>
          <button class="btn btn-secondary" @click="goBack()">Go Back</button>
        </div>
      </div>
      <div v-else-if="product === null" class="text-center mt-4">
        <h3>Product not found. Please try again later.</h3>
      </div>
      <div v-else class="text-center mt-4">
        <h3>Loading product details...</h3>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    name: "ProductDetails",
    props: ["id"], // Recebe o ID como prop
    data() {
      return {
        product: null, // Armazena os detalhes do produto
        isAdding: false, // Estado para controlar o botão "Add to Cart"
      };
    },
    methods: {
      ...mapActions(["addToCart"]), // Mapeia a ação Vuex "addToCart"
      async fetchProduct() {
        this.product = null; // Limpa o produto antes de buscar
        try {
          const response = await fetch(
            `https://fakestoreapi.com/products/${this.$route.params.id}`
          );
          if (!response.ok) throw new Error("Product not found");
          this.product = await response.json();
        } catch (error) {
          console.error(error.message);
        }
      },
      async addToCartHandler(product) {
        this.isAdding = true; // Atualiza o estado para desativar o botão
        await this.addToCart(product); // Chama a ação Vuex
        this.isAdding = false; // Restaura o estado do botão
      },
      goBack() {
        if (window.history.length > 1) {
          this.$router.back();
        } else {
          this.$router.push("/products"); // Volta para a página de produtos como fallback
        }
      },
    },
    async mounted() {
      await this.fetchProduct();
    },
  };
  </script>
  
  <style scoped>
  .card {
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .card-img-top {
    max-height: 400px;
    object-fit: contain;
  }
  
  .btn {
    margin-right: 8px;
  }
  
  .card-body {
    text-align: center;
  }
  </style>
  