<template>
    <ion-modal :is-open="isOpen" @didDismiss="closeModal">
        <ion-header>
            <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="closeModal()">Cancelar</ion-button>
            </ion-buttons>
            <ion-title>Confirmar datos</ion-title>
            <ion-buttons slot="end">
                <ion-button :strong="true" type="submit" form="modal-form">Confirm</ion-button>
            </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <form @submit.prevent="submitForm" id="modal-form">
                <ion-item v-for="field in fields" :key="field.id">
                    <ion-input
                    :id="field.id"
                    :label="field.label"
                    label-placement="stacked"
                    ref="input"
                    type="text"
                    :value="dataToConfirm[field.key]"
                    ></ion-input>
                </ion-item>
            </form>
        </ion-content>
        <!--ion-content class="ion-padding">
            <ion-item>
                <form @submit.prevent="submitForm" id="modal-form">
                    <div v-for="field in fields" :key="field.id">
                        <label :for="field.id" class="form-label">{{ field.label }}</label>
                        <ion-input
                        :id="field.id"
                        v-model="dataToConfirm[field.key]"
                        :type="field.type || 'text'"
                        class="form-input"
                        />
                    </div>
                </form>
            </ion-item>
        </ion-content-->
    </ion-modal>
  </template>
  
  <script>
    import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
  } from '@ionic/vue';
  
  export default {
    props: {
      isOpen: Boolean,
      dataToConfirm: Object,
    },
    emits: ['close', 'submit'],
    data() {
      return {
        fields: [
            { id: 'puesto_trabajo', label: 'Puesto de trabajo', key: 'puesto_trabajo' },
            { id: 'grupo_profesional', label: 'Grupo profesional', key: 'grupo_profesional' },
            { id: 'empresa_nombre', label: 'Nombre de la empresa', key: 'empresa_nombre' },
            { id: 'periodo_mes', label: 'Periodo (mes)', key: 'periodo_mes' },
            { id: 'periodo_dias_trabajados', label: 'Días trabajados', key: 'periodo_dias_trabajados' },
            { id: 'salario_base', label: 'Salario base', key: 'salario_base' },
            { id: 'complementos', label: 'Complementos', key: 'complementos' },
            { id: 'horas_extras', label: 'Horas extras', key: 'horas_extras' },
            { id: 'dietas', label: 'Dietas', key: 'dietas' },
            { id: 'pagas_extraordinarias', label: 'Pagas extraordinarias', key: 'pagas_extraordinarias' },
            { id: 'total_devengado', label: 'Total devengado', key: 'total_devengado' },
            { id: 'contingencias_comunes', label: 'Contingencias comunes', key: 'contingencias_comunes' },
            { id: 'formacion_profesional', label: 'Formación profesional', key: 'formacion_profesional' },
            { id: 'desempleo', label: 'Desempleo', key: 'desempleo' },
            { id: 'horas_extras_seguridad_social', label: 'Horas extras S.S.', key: 'horas_extras_seguridad_social' },
            { id: 'irpf', label: 'IRPF', key: 'irpf' },
            { id: 'otros_descuentos', label: 'Otros descuentos', key: 'otros_descuentos' },
            { id: 'total_deducido', label: 'Total deducido', key: 'total_deducido' },
            { id: 'base_irpf', label: 'Base IRPF', key: 'base_irpf' },
            { id: 'base_contingencias_comunes', label: 'Base contingencias comunes', key: 'base_contingencias_comunes' },
            { id: 'base_contingencias_profesionales', label: 'Base contingencias profesionales', key: 'base_contingencias_profesionales' },
            { id: 'liquido_percibido', label: 'Líquido percibido', key: 'liquido_percibido' },
        ]
      };
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      submitForm() {
        this.$emit('submit', this.dataToConfirm);
      },
    },
  };
  </script>
  