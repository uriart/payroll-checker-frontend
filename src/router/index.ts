import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import FileUpload from '../components/FileUpload.vue'
import Warehouse from '../components/Warehouse.vue'
import ConfirmDataForm from '../components/ConfirmDataForm.vue'
import { useAuth0 } from '@auth0/auth0-vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',  // Esto configura la ruta por defecto para el Home
        name: 'FileUpload',
        component: FileUpload,
      },
      {
        path: 'warehouse',
        name: 'Warehouse',
        component: Warehouse,
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guard de navegación para verificar autenticación
router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  // Esperar a que se complete el proceso de carga de Auth0
  while (isLoading.value) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Verifica si el usuario está autenticado
  const authStatus = await isAuthenticated.value;

  if (!authStatus) {
    // Redirige al login si no está autenticado
    await loginWithRedirect();
  } else {
    next(); // Permite la navegación
  }
});

export default router
