<template>
  <div>
    <div class="buttons">
      <ion-button @click="setTab('summary')" :class="{ 'active': tab === 'summary' }">Resumen</ion-button>
      <ion-button @click="setTab('genres')" :class="{ 'active': tab === 'genres' }">Géneros</ion-button>
      <ion-button @click="setTab('production')" :class="{ 'active': tab === 'production' }">Producción</ion-button>
      <ion-button @click="setTab('trailer')" :class="{ 'active': tab === 'trailer' }">Trailer</ion-button>
    </div>
    <div v-if="tab === 'summary'" class="tab-content" id="summary">
      <p>{{ movie.overview }}</p>
    </div>
    <div v-if="tab === 'genres'" class="tab-content">
      <ul>
        <li v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</li>
      </ul>
    </div>
    <div v-if="tab === 'production'" class="tab-content">
      <ul>
        <li v-for="company in movie.production_companies" :key="company.id">{{ company.name }} ({{ company.origin_country }})</li>
      </ul>
    </div>
    <div v-if="tab === 'trailer'" class="tab-content trailer-content">
      <iframe
        v-if="trailer"
        :src="`https://www.youtube.com/embed/${trailer.key}`"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <p v-else>No hay trailer disponible</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonButton } from '@ionic/vue';

export default defineComponent({
  components: {
    IonButton
  },
  props: {
    movie: {
      type: Object,
      required: true
    },
    trailer: {
      type: Object,
      required: false
    }
  },
  setup() {
    const tab = ref('summary');

    const setTab = (newTab: string) => {
      tab.value = newTab;
    };

    return {
      tab,
      setTab
    };
  }
});
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0; /* Ajusta el margen superior e inferior */
  flex-wrap: wrap; /* Permite que los botones se ajusten en varias líneas si es necesario */
}

.buttons ion-button {
  color: white;
  --background: transparent; /* Fondo transparente para un estilo limpio */
  --border-color: transparent; /* Borde transparente */
  font-weight: bold; /* Texto en negrita para botones activos */
}

.buttons ion-button.active {
  color: #3880ff; /* Color azul para botones activos */
}

.tab-content {
  margin-top: 1rem;
  text-align: center; /* Centra el contenido de cada pestaña */
}

.trailer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
}

iframe {
  width: 80%;
  height: 315px; /* Altura fija para el iframe del trailer */
  max-width: 600px; /* Ancho máximo del iframe */
  border: none; /* Sin borde para el iframe */
}

@media (max-width: 600px) {
  .buttons {
    flex-direction: column; /* Cambia la dirección de los botones a columna en pantallas pequeñas */
    align-items: center; /* Centra los botones */
  }
}
</style>
