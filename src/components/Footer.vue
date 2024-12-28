<template>
    <ion-footer class="ion-no-border">
        <ion-toolbar>
            <div class="icons-container">
                <ion-icon 
                    :icon="cloudUpload" 
                    size="large" 
                    color="primary" 
                    @click="goToFileUpload">
                </ion-icon>
                <ion-icon 
                    :icon="list" 
                    size="large" 
                    color="primary" 
                    @click="goToWarehouse">
                </ion-icon>
            </div>
        </ion-toolbar>
    </ion-footer>
</template>

<script lang="ts">
  import { IonFooter, IonToolbar, IonIcon } from '@ionic/vue';
  import { cloudUpload, list } from 'ionicons/icons';
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: { IonFooter, IonToolbar, IonIcon },
    setup() {
        const router = useRouter();

        const goToFileUpload = () => {
        router.push({ name: 'FileUpload' });
        };

        const goToWarehouse = () => {
        router.push({ name: 'Warehouse' });
        };
      return { cloudUpload, list, goToFileUpload, goToWarehouse };
    },
  });

</script>


<style>
    .icons-container {
        display: flex;
        justify-content: space-around; /* Espacio igual entre ítems y márgenes */
        align-items: center; /* Centra verticalmente */
        flex: 1; /* Ocupa todo el espacio disponible */
        padding: 16px; /* Espaciado adicional para que no esté pegado a los bordes */
    }

    .icon {
        font-size: 48px; /* Tamaño de los iconos */
        color: var(--ion-color-primary); /* Color de los iconos */
    }
</style>