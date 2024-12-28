import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import FileUpload from '../components/FileUpload.vue'
import Warehouse from '../components/Warehouse.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/file-upload',
    name: 'FileUpload',
    component: FileUpload,
  },
  {
    path: '/warehouse',
    name: 'Warehouse',
    component: Warehouse,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
