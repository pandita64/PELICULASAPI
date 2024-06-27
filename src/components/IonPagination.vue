<template>
  <ion-footer>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button :disabled="currentPage <= 1" @click="changePage(currentPage - 1)" class="previous-button" aria-label="Página anterior">
          Anterior
        </ion-button>
      </ion-buttons>
      <ion-buttons class="number-buttons">
        <ion-button
          v-for="pageNumber in visiblePages"
          :key="pageNumber"
          :class="{ 'active': pageNumber === currentPage }"
          @click="changePage(pageNumber)"
          fill="clear"
          size="small"
          class="number-button"
          aria-label="Página {{ pageNumber }}"
        >
          <span>{{ pageNumber }}</span>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button :disabled="currentPage >= totalPages" @click="changePage(currentPage + 1)" class="next-button" aria-label="Siguiente página">
          Siguiente
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { IonButton, IonButtons, IonFooter, IonToolbar } from '@ionic/vue';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  components: {
    IonFooter,
    IonToolbar,
    IonButtons,
    IonButton,
  },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['page-changed'],
  setup(props, { emit }) {
    const changePage = (page: number) => {
      emit('page-changed', page);
    };

    const visiblePages = computed(() => {
      const maxVisible = 5; // Ajusta este valor para mostrar más o menos botones
      const start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2));
      const end = Math.min(props.totalPages, start + maxVisible - 1);
      return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    });

    return {
      changePage,
      visiblePages
    };
  }
});
</script>

<style scoped>
ion-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem;
  background-color: #2c2c2c;
}

.number-buttons {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.number-buttons ion-button {
  --background: transparent;
  --border-color: transparent;
  --box-shadow: none;
  text-align: center;
  min-width: 30px;
  color: white;
}

.number-buttons ion-button span {
  width: 100%;
  display: inline-block;
  text-align: center;
}

.number-buttons ion-button.active {
  font-weight: bold;
  color: #ff6f61; /* Color del número de página activo */
}

.previous-button,
.next-button {
  margin: 0 5px;
  color: white;
}

.previous-button[disabled],
.next-button[disabled] {
  color: #6c757d; /* Color para los botones deshabilitados */
}

@media (max-width: 600px) {
  .number-buttons ion-button {
    min-width: 25px;
    padding: 0 5px;
  }
}
</style>
