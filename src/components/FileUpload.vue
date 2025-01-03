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
    message="Leyendo la nómina..."
    duration="0"
    spinner="circles"
  ></ion-loading>

  <ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
    <template #default>
      <div id="modal-container">
        <h3 class="modal-title">Confirmar Datos</h3>

        <!-- Área desplazable -->
        <div id="modal-scroll">
          <form @submit.prevent="submitForm" id="modal-form">
            <!-- Campo: Puesto de trabajo -->
            <div class="form-group">
              <label for="puesto_trabajo" class="form-label">
                Puesto de trabajo
              </label>
              <input
                id="puesto_trabajo"
                v-model="dataToConfirm.empleado.puesto_trabajo"
                type="text"
                class="form-input"
              />
            </div>

            <!-- Campo: Grupo profesional -->
            <div class="form-group">
              <label for="grupo_profesional" class="form-label">
                Grupo profesional
              </label>
              <input
                id="grupo_profesional"
                v-model="dataToConfirm.empleado.grupo_profesional"
                type="text"
                class="form-input"
              />
            </div>

            <div>
              <label for="fecha_alta" class="form-label">fecha_alta</label>
              <input id="fecha_alta" class="form-input" v-model="dataToConfirm.empleado.fecha_alta" type="text" />
            </div>

            <div>
              <label for="nombre_empresa" class="form-label">nombre_empresa</label>
              <input id="nombre_empresa" class="form-input" v-model="dataToConfirm.empresa.nombre" type="text" />
            </div>

            <div>
              <label for="mes" class="form-label">Mes</label>
              <input id="mes" class="form-input" v-model="dataToConfirm.nomina.periodo.mes" type="text" />
            </div>
            <div>
              <label for="dias_trabajados" class="form-label">dias_trabajados</label>
              <input id="dias_trabajados" class="form-input" v-model="dataToConfirm.nomina.periodo.dias_trabajados" type="text" />
            </div>

            <div>
              <label for="salario_base" class="form-label">salario_base</label>
              <input id="salario_base" class="form-input" v-model="dataToConfirm.nomina.devengos.salario_base" type="text" />
            </div>
            <div>
              <label for="complementos" class="form-label">complementos</label>
              <input id="complementos"  class="form-input" v-model="dataToConfirm.nomina.devengos.complementos" type="text" />
            </div>
            <div>
              <label for="horas_extras" class="form-label">horas_extras</label>
              <input id="horas_extras"  class="form-input" v-model="dataToConfirm.nomina.devengos.horas_extras" type="text" />
            </div>
            <div>
              <label for="dietas" class="form-label">dietas</label>
              <input id="dietas"  class="form-input" v-model="dataToConfirm.nomina.devengos.dietas" type="text" />
            </div>
            <div>
              <label for="pagas_extraordinarias" class="form-label">pagas_extraordinarias</label>
              <input id="pagas_extraordinarias"  class="form-input" v-model="dataToConfirm.nomina.devengos.pagas_extraordinarias" type="text" />
            </div>
            <div>
              <label for="total_devengado" class="form-label">total_devengado</label>
              <input id="total_devengado"  class="form-input" v-model="dataToConfirm.nomina.devengos.total_devengado" type="text" />
            </div>

            <div>
              <label for="contingencias_comunes" class="form-label">contingencias_comunes</label>
              <input id="contingencias_comunes"  class="form-input" v-model="dataToConfirm.nomina.deducciones.seguridad_social.contingencias_comunes" type="text" />
            </div>
            <div>
              <label for="formacion_profesional" class="form-label">formacion_profesional</label>
              <input id="formacion_profesional"  class="form-input" v-model="dataToConfirm.nomina.deducciones.seguridad_social.formacion_profesional" type="text" />
            </div>
            <div>
              <label for="desempleo" class="form-label">desempleo</label>
              <input id="desempleo"  class="form-input" v-model="dataToConfirm.nomina.deducciones.seguridad_social.desempleo" type="text" />
            </div>
            <div>
              <label for="horas_extras" class="form-label">horas_extras</label>
              <input id="horas_extras"  class="form-input" v-model="dataToConfirm.nomina.deducciones.seguridad_social.horas_extras" type="text" />
            </div>

            <div>
              <label for="irpf" class="form-label">irpf</label>
              <input id="irpf"  class="form-input" v-model="dataToConfirm.nomina.deducciones.irpf" type="text" />
            </div>
            <div>
              <label for="otros_descuentos" class="form-label">otros_descuentos</label>
              <input id="otros_descuentos"  class="form-input" v-model="dataToConfirm.nomina.deducciones.otros_descuentos" type="text" />
            </div>
            <div>
              <label for="total_deducido" class="form-label">total_deducido</label>
              <input id="total_deducido"  class="form-input" v-model="dataToConfirm.nomina.deducciones.total_deducido" type="text" />
            </div>


            <div>
              <label for="liquido_percibido" class="form-label">liquido_percibido</label>
              <input id="liquido_percibido"  class="form-input" v-model="dataToConfirm.nomina.liquido_percibido" type="text" />
            </div>

            
            <div>
              <label for="base_irpf" class="form-label">base_irpf</label>
              <input id="base_irpf"  class="form-input" v-model="dataToConfirm.nomina.bases.base_irpf" type="text" />
            </div>
            <div>
              <label for="base_contingencias_comunes" class="form-label">base_contingencias_comunes</label>
              <input id="base_contingencias_comunes"  class="form-input" v-model="dataToConfirm.nomina.bases.base_contingencias_comunes" type="text" />
            </div>
            <div>
              <label for="base_contingencias_profesionales" class="form-label">base_contingencias_profesionales</label>
              <input id="base_contingencias_profesionales"  class="form-input" v-model="dataToConfirm.nomina.bases.base_contingencias_profesionales" type="text" />
            </div>

          </form>
        </div>

        <!-- Botones fijos -->
        <div id="modal-buttons">
          <button type="submit" form="modal-form" class="form-button-submit">
            Enviar
          </button>
          <button @click="closeModal" class="form-button-cancel">
            Cancelar
          </button>
        </div>        

      </div>
    </template>
  </ion-modal>

</template>


<script>
import axios from 'axios';
import { alertController, IonLoading } from '@ionic/vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { camera } from 'ionicons/icons';
import { IonModal } from '@ionic/vue';

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
      isModalOpen: true,
      dataToConfirm: this.emptyData(),
    };
  },
  components: { IonLoading, IonModal },
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
      return {
          "empleado": {
              "puesto_trabajo": "",
              "grupo_profesional": "",
              "fecha_alta": ""
          },
          "empresa": {
              "nombre": ""
          },
          "nomina": {
              "periodo": {
                  "mes": "",
                  "dias_trabajados": 0
              },
              "devengos": {
                  "salario_base": 0,
                  "complementos": 0,
                  "horas_extras": 0,
                  "dietas": 0,
                  "pagas_extraordinarias": 0,
                  "total_devengado": 0
              },
              "deducciones": {
                  "seguridad_social": {
                      "contingencias_comunes": 0,
                      "formacion_profesional": 0,
                      "desempleo": 0,
                      "horas_extras": 0
                  },
                  "irpf": 0,
                  "otros_descuentos": 0,
                  "total_deducido": 0
              },
              "liquido_percibido": 0,
              "bases": {
                  "base_irpf": 0,
                  "base_contingencias_comunes": 0,
                  "base_contingencias_profesionales": 0
              }
          }
      };
    },
    submitForm() {
      console.log("Datos enviados:", this.dataToConfirm);
      alert(`Datos enviados: ${JSON.stringify(this.dataToConfirm, null, 2)}`);
    },
  },
};
</script>

<style scoped>
#modal-container {
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  max-height: 100vh; /* Altura máxima del modal */
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

#modal-scroll {
  overflow-y: auto;
  max-height: 100vh; /* Altura máxima del área desplazable */
  margin-bottom: 1rem;
  padding-right: 0.5rem; /* Espaciado para evitar solapamiento con el scroll */
}

#modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  position: sticky; /* Hace que los botones sean visibles al hacer scroll */
  bottom: 0;
  background-color: #ffffff; /* Fondo para mantener contraste con el contenido */
  padding-top: 1rem;
  border-top: 1px solid #e5e5e5;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a4a4a;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #dcdcdc;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  border-color: #3182ce;
  box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.25);
}

.form-button-submit {
  width: 100%;
  background-color: #3182ce;
  color: #ffffff;
  font-weight: bold;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.form-button-submit:hover {
  background-color: #2c5282;
}

.form-button-cancel {
  width: 100%;
  background-color: hsl(0, 0%, 44%);
  color: #ffffff;
  font-weight: bold;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.form-button-cancel:hover {
  background-color: #c53030;
}
</style>