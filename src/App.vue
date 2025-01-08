<template>
  <ion-app>
    <div class="app-container">
      <ion-content class="content">
        <Home />
      </ion-content>
      <Footer />
    </div>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonContent } from '@ionic/vue';
import Home from './views/Home.vue';
import Footer from './components/Footer.vue';
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Asegura que el contenedor ocupe toda la pantalla */
}

.content {
  flex: 1; /* Permite que el contenido principal ocupe el espacio disponible */
  overflow-y: auto; /* Habilita el scroll solo para el contenido principal */
}

footer {
  flex-shrink: 0; /* Evita que el footer sea comprimido */
  height: 60px; /* Ajusta según la altura deseada del footer */
  background-color: #f8f9fa; /* Color de fondo para diferenciar */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
