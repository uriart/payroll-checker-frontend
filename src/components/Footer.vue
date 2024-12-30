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
                <ion-icon 
                    :icon="logOut" 
                    size="large" 
                    color="primary" 
                    @click="logoutAuth0">
                </ion-icon>
            </div>
        </ion-toolbar>
    </ion-footer>
</template>

<script lang="ts">
  import { IonFooter, IonToolbar, IonIcon } from '@ionic/vue';
  import { cloudUpload, list, logOut } from 'ionicons/icons';
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuth0 } from '@auth0/auth0-vue';

  export default defineComponent({
    components: { IonFooter, IonToolbar, IonIcon },
    setup() {
        const router = useRouter();
        const { logout } = useAuth0();

        const goToFileUpload = () => {
        router.push({ name: 'FileUpload' });
        };

        const goToWarehouse = () => {
        router.push({ name: 'Warehouse' });
        };

        const logoutAuth0 = () => {
            logout({ logoutParams: { returnTo: window.location.origin } });
        };
      return { cloudUpload, list, logOut, logoutAuth0, goToFileUpload, goToWarehouse };
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