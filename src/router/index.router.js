import { createRouter, createWebHistory } from 'vue-router';
import Products from '../components/Products.vue';
import Overview from '../components/Overview.vue';
import CartDetails from '../components/CartDetails.vue';
import Carts from '../components/Carts.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import ProductDetails from '../components/ProductDetails.vue';
import Users from '../components/Users.vue'; // Import Users
import Dashboard from '../components/Dashboard.vue'; // Import Dashboard

const routes = [
  { path: '/', component: Overview },
  { path: '/products', component: Products },
  { path: '/cart/:id', component: CartDetails },
  { path: '/carts', component: Carts },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/products/:id', name: 'ProductDetails', component: ProductDetails, props: true },
  { path: '/users', component: Users, meta: { requiresAuth: true } }, // Rota de usuários
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }, // Rota de dashboard
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware para proteger rotas autenticadas
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica se há token no localStorage
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redireciona para a página de login se não estiver autenticado
  } else {
    next(); // Permite o acesso
  }
});

export default router;
