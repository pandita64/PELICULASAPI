<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>PeliculasCY</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="genres-grid">
        <GenreCard v-for="genre in genres" :key="genre.id" :genre="genre" @select-genre="filterByGenre" />
      </div>
      <FilterButtons @filter-category="filterByCategory" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import api from '@/services/api';
import GenreCard from '@/components/GenreCard.vue';
import FilterButtons from '@/components/FilterButtons.vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

export default defineComponent({
  components: {
    GenreCard,
    FilterButtons,
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle
  },
  setup() {
    const genres = ref<any[]>([]);

    onMounted(async () => {
      genres.value = await api.getGenres();
    });

    const filterByGenre = (id: number) => {
      window.location.href = `/movies?filter=genre&id=${id}`;
    };

    const filterByCategory = (category: string) => {
      window.location.href = `/movies?filter=${category}`;
    };

    return {
      genres,
      filterByGenre,
      filterByCategory
    };
  }
});
</script>

<style scoped>
.genres-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.genres-grid::after {
  content: '';
  flex-grow: 999999999;
  min-width: 150px;
  height: 0;
}

.ion-page {
  --background: #f9f9f9;
}

ion-toolbar {
  --background: #2257c956;
  --color: white;
}

ion-title {
  text-align: center;
}

.genres-grid {
  margin: 0 auto;
  max-width: 1200px;
}

.genres-grid > * {
  transition: transform 0.2s;
}

.genres-grid > *:hover {
  transform: scale(1.05);
}

</style>
