<template>
  <div class="container products-page">
    <h1 class="my-4 text-center">Products</h1>
    <div class="row">
      <!-- Sidebar -->
      <aside class="col-md-3">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            v-model="search"
            placeholder="Search by name"
            style="width: 100%;"
          />
        </div>
        <div class="mb-3">
          <h5>Categories</h5>
          <div class="list-group">
            <label
              v-for="category in categories"
              :key="category"
              class="list-group-item"
            >
              <input
                type="checkbox"
                v-model="selectedCategories"
                :value="category"
                class="form-check-input me-2"
              />
              {{ category }}
            </label>
          </div>
        </div>
        <div class="mb-3">
          <button class="btn btn-secondary w-100" @click="toggleAlphabeticalOrder">
            Sort: {{ alphabeticalOrder ? 'A-Z' : 'Z-A' }}
          </button>
        </div>
        <div>
          <button class="btn btn-success w-100" @click="togglePriceOrder">
            Sort by Price: {{ priceOrder ? 'Low to High' : 'High to Low' }}
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="col-md-9">
        <div class="row g-4">
          <div
            class="col-md-4"
            v-for="product in filteredProducts"
            :key="product.id"
          >
            <div class="card h-100">
              <img
                :src="product.image"
                class="card-img-top"
                :alt="product.title"
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title text-truncate">{{ product.title }}</h5>
                <p class="card-text text-truncate">{{ product.description }}</p>
                <p class="card-text"><strong>${{ product.price }}</strong></p>
                <div class="mt-auto">
                  <button
                    class="btn btn-primary btn-sm w-100 mb-2"
                    @click="viewProduct(product.id)"
                  >
                    View
                  </button>
                  <button
                    class="btn btn-warning btn-sm w-100 mb-2"
                    @click="addToCart(product)"
                  >
                    Add to Cart
                  </button>
                  <button
                    class="btn btn-danger btn-sm w-100"
                    @click="deleteProduct(product.id)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Products',
  data() {
    return {
      search: '',
      selectedCategories: [], // Será definido após carregar as categorias
      alphabeticalOrder: true,
      priceOrder: true,
    };
  },
  computed: {
    ...mapGetters(['allProducts', 'allCategories', 'cartItems']),
    filteredProducts() {
      let products = this.allProducts;

      // Filter by search term
      if (this.search) {
        products = products.filter((product) =>
          product.title.toLowerCase().includes(this.search.toLowerCase())
        );
      }

      // Filter by selected categories
      if (this.selectedCategories.length > 0) {
        products = products.filter((product) =>
          this.selectedCategories.includes(product.category)
        );
      }

      // Sort alphabetically
      if (this.alphabeticalOrder) {
        products.sort((a, b) =>
          a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
        );
      } else {
        products.sort((a, b) =>
          b.title.localeCompare(a.title, undefined, { sensitivity: 'base' })
        );
      }

      // Sort by price
      if (!this.priceOrder) {
        products.sort((a, b) => b.price - a.price);
      } else {
        products.sort((a, b) => a.price - b.price);
      }

      return products;
    },
    categories() {
      return this.allCategories;
    },
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchCategories', 'deleteProduct', 'addToCart']),
    viewProduct(id) {
      this.$router.push(`/products/${id}`);
    },
    toggleAlphabeticalOrder() {
      this.alphabeticalOrder = !this.alphabeticalOrder;
    },
    togglePriceOrder() {
      this.priceOrder = !this.priceOrder;
    },
    initializeSelectedCategory() {
      if (this.allCategories.length > 0) {
        // Seleciona a primeira categoria automaticamente
        this.selectedCategories = [this.allCategories[0]];
      }
    },
    addToCart(product) {
      this.addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
    },
  },
  watch: {
    allCategories(newCategories) {
      if (newCategories.length > 0 && this.selectedCategories.length === 0) {
        this.initializeSelectedCategory();
      }
    },
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
};
</script>

<style scoped>
.products-page {
  padding: 20px 0;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

/* Style for the sidebar */
aside {
  padding-right: 20px;
  border-right: 1px solid #ddd;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

/* List group items for categories */
.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #f1f1f1;
}

/* Adjustments to make the sidebar stay on the left */
@media (max-width: 768px) {
  .products-page .row {
    flex-direction: column;
  }

  aside {
    padding-right: 0;
    border-right: none;
  }
}
</style>
