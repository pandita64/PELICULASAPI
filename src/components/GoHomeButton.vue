<template>
  <ion-card class="home-button-card">
    <ion-button @click="goHome" color="primary" expand="full" class="home-button">
      IR AL INICIO
    </ion-button>
  </ion-card>
</template>

<script lang="ts">
import { IonButton, IonCard } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    IonButton,
    IonCard,
  },
  setup() {
    const router = useRouter();

    const goHome = () => {
      router.push({ name: 'HomePage' });
    };

    return {
      goHome,
    };
  },
});
</script>

<style scoped>
.home-button-card {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #1f1f1f; /* Fondo oscuro */
  border-radius: 10px; /* Bordes redondeados */

}

.home-button {
  font-size: 1rem; /* Tamaño de fuente */
  font-weight: bold; /* Negrita */
  color: white; /* Color del texto */
  --border-radius: 20px; /* Bordes redondeados del botón */
  --padding-start: 1rem; /* Padding izquierdo */
  --padding-end: 1rem; /* Padding derecho */
  --padding-top: 0.5rem; /* Padding superior */
  --padding-bottom: 0.5rem; /* Padding inferior */
  transition: background-color 0.3s ease; /* Transición de color de fondo */
}


</style>
