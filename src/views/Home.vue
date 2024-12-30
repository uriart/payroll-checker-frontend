<template>
  <div class="home" v-if="isAuthenticated">
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script> 
import Footer from '../components/Footer.vue';
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: 'Home',
  components: {
    Footer
  },
  setup() {
    const { isAuthenticated } = useAuth0();
    return { isAuthenticated };
  },
};
</script>

<style scoped>

.home {
  display: flex; /* Flexbox para alinear los elementos */
  flex-direction: column; /* Apila los hijos verticalmente */
  justify-content: space-between; /* Asegura que el footer se mantenga al final */
  /*height: 100vh; /* Ocupa toda la altura de la ventana */
  margin: 0;
  padding: 0;
}

.main-container {
  flex: 1; /* Toma el espacio restante entre el header y el footer */
  justify-content: center;
  align-items: center;
  padding: 16px; /* Ajusta el padding según sea necesario */
}

footer {
  text-align: center;
  padding: 16px;
  background-color: var(--ion-background-color);
  color: var(--ion-text-color);
}
</style>
