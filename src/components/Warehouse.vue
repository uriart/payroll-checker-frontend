<template>
  <div>
    <h2>Nóminas</h2>
    <ion-card v-for="(item, index) in payrolls" :key="index">
      <ion-card-header>
        <ion-card-subtitle>{{ item.periodo_mes }}</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        💵{{ item.total_devengado }}€
        💸{{ item.total_deducido }}€
        💰<b>{{ item.liquido_percibido }}€</b>
      </ion-card-content>
    </ion-card>

  </div>
</template>

<script>
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  setup() {
    const { getAccessTokenSilently } = useAuth0();

    return {
      getAccessTokenSilently,
    };
  },
  data() {
    return {
      payrolls: [
        {
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
        }
      ],
    };
  },
  methods: {
    async getPayrolls() {
      try {
        const token = await this.getAccessTokenSilently();
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_BASE_URL + "/payroll/all",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        this.payrolls = response.data;
      } catch (error) {
        console.error("Error al obtener las nóminas:", error);
      }
    },
  },
  async mounted() {
    await this.getPayrolls();
  },
};
</script>
