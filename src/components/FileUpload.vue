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

  <ion-button expand="block" @click="takePhoto()">
    <ion-icon :icon="camera"></ion-icon>
  </ion-button>

  <ion-loading
    v-if="isLoading"
    :is-open="isLoading"
    :message="loadingMessage"
    duration="0"
    spinner="circles"
  ></ion-loading>

  <PayrollModal 
  :is-open="isModalOpen" 
  :data-to-confirm="dataToConfirm" 
  @close="closeModal" 
  @submit="submitPayrollData" 
/>

</template>


<script>
import axios from 'axios';
import { alertController, IonLoading } from '@ionic/vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { camera } from 'ionicons/icons';
import { IonModal } from '@ionic/vue';
import PayrollModal from './PayrollModal.vue';

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
      getAccessTokenSilently, camera
    };
  },
  data() {
    return {
      file: null,
      isLoading: false,
      loadingMessage: "",
      isModalOpen: false,
      dataToConfirm: this.emptyData(),
    };
  },
  components: { IonLoading, IonModal, PayrollModal },
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
    async takePhoto() {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100,
      });

      this.file = this.dataURLtoFile(photo.dataUrl, 'photo.jpg');
      await this.uploadFile();
    },    
    dataURLtoFile(dataUrl, fileName) {
      // Convierte base64 a un Blob
      const arr = dataUrl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], fileName, { type: mime });
    },
    async uploadFile() {
      this.isLoading = true;
      this.loadingMessage = "Leyendo la nómina...";

      const formData = new FormData();
      formData.append('file', this.file);

      try {
        const token = await this.getAccessTokenSilently();
        const response = await axios.post(import.meta.env.VITE_BACKEND_BASE_URL + '/payroll/struct', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        this.dataToConfirm = response.data;
        this.isModalOpen = true;
      } catch (error) {
        console.error('Error uploading file:', error);
        presentAlert();
      }finally {
        this.isLoading = false;
      }
    },
    closeModal() {
      this.isModalOpen = false;
      this.dataToConfirm = this.emptyData();
    },
    emptyData() {
      return 	{
        "puesto_trabajo": "",
        "grupo_profesional": "",
        "empresa_nombre": "",
        "periodo_mes": "", 
        "periodo_dias_trabajados": 0,
        "salario_base": 0,
        "complementos": 0,
        "horas_extras": 0,
        "dietas": 0,
        "pagas_extraordinarias": 0,
        "total_devengado": 0,
        "contingencias_comunes": 0,
        "formacion_profesional": 0,
        "desempleo": 0,
        "horas_extras_seguridad_social": 0,
        "irpf": 0,
        "otros_descuentos": 0,
        "total_deducido": 0,
        "base_irpf": 0,
        "base_contingencias_comunes": 0,
        "base_contingencias_profesionales": 0,
        "liquido_percibido": 0
	    };
    },
    async submitPayrollData() {

      this.isLoading = true;
      this.loadingMessage = "Guardando la nómina...";

      try {
        const token = await this.getAccessTokenSilently();
        const response = await axios.post(import.meta.env.VITE_BACKEND_BASE_URL + '/payroll/create', JSON.stringify(this.dataToConfirm, null, 2), {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Error creating payroll:', error);
        presentAlert();
      }finally {
        this.isLoading = false;
        this.isModalOpen = false;
      }

    },
  },
};
</script>

