import { createRouter, createWebHistory } from 'vue-router';
import Products from '../components/Products.vue';
import Overview from '../components/Overview.vue';
import CartDetails from '../components/CartDetails.vue';
import Carts from '../components/Carts.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import ProductDetails from '../components/ProductDetails.vue';

const routes = [
  { path: '/', component: Overview },
  { path: '/products', component: Products },
  { path: '/cart/:id', component: CartDetails },
  { path: '/carts', component: Carts },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  {path: '/products/:id', name: 'ProductDetails', component: ProductDetails, props: true,}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
