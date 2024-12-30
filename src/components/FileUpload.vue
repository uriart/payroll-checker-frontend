<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Carga tu nómina en pdf</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-input type="file" @change="onFileChange" accept=".pdf" />
    </ion-card-content>
  </ion-card>

  <ion-button expand="block" color="primary" @click="uploadFile">
    <ion-icon name="cloud-upload-outline" slot="start"></ion-icon>
    Cargar PDF
  </ion-button>

  <ion-textarea
    readonly
    placeholder="Server response will appear here..."
    :value="jsonResponse"
    rows="6">
  </ion-textarea>
</template>


<script>
import axios from 'axios';
import { alertController } from '@ionic/vue';
import { useAuth0 } from '@auth0/auth0-vue';

const presentAlert = async () => {
  const alert = await alertController.create({
    header: 'Error leyendo la nómina',
    message: 'Revisa los datos o envía una nómina correcta.',
    buttons: ['Aceptar'],
  });

  await alert.present();
};

export default {
  setup() {
    const { getAccessTokenSilently } = useAuth0();

    return {
      getAccessTokenSilently,
    };
  },
  data() {
    return {
      file: null,
      jsonResponse: null,
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && (file.type === 'application/pdf' || file.type === "image/jpeg")) {
        this.file = file;
      } else {
        alert('Please select a valid pdf or jpeg file.');
        this.file = null;
      }
    },
    async uploadFile() {
      const formData = new FormData();
      formData.append('file', this.file);

      try {
        const token = await this.getAccessTokenSilently();
        const response = await axios.post(import.meta.env.VITE_BACKEND_BASE_URL + '/payroll/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response.data)
        this.jsonResponse = JSON.stringify(response.data, null, 2);
      } catch (error) {
        console.error('Error uploading file:', error);
        presentAlert();
      }
    },
  },
};
</script>
