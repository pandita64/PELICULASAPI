<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <GoHomeButton />
        </ion-buttons>
        <ion-title class="title">DETALLES</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="movie">
      <div class="movie-detail">
        <div class="poster-container">
          <img :src="`${baseImgUrl}${movie.poster_path}`" alt="movie poster" />
        </div>
        <div class="detail">
          <ion-card-title class="movie-title">{{ movie.title }}</ion-card-title>
          <ion-card-subtitle class="release-date">{{ movie.release_date }}</ion-card-subtitle>
          <MovieDetailTabs :movie="movie" :trailer="trailer" />
        </div>
      </div>
    </ion-content>
    <ion-loading v-else />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import { IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar, IonButtons } from '@ionic/vue';
import GoHomeButton from '@/components/GoHomeButton.vue';
import MovieDetailTabs from '@/components/MovieDetailTabs.vue';

export default defineComponent({
  components: {
    IonPage,
    IonLoading,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCardTitle,
    IonCardSubtitle,
    IonButtons,
    GoHomeButton,
    MovieDetailTabs
  },
  setup() {
    const route = useRoute();
    const movie = ref<any>(null);
    const trailer = ref<any>(null);
    const baseImgUrl = api.baseImgUrl();

    const fetchMovieDetail = async () => {
      const movieId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
      if (movieId) {
        try {
          movie.value = await api.getMovieDetail(movieId);
          const trailers = await api.getMovieTrailer(movieId);
          trailer.value = trailers.length > 0 ? trailers[0] : null;
        } catch (error) {
          console.error('Error al recuperar los detalles de la película:', error);
        }
      } else {
        console.error('El ID de la película no está definido o es nulo:', movieId);
      }
    };

    onMounted(() => {
      fetchMovieDetail();
    });

    return {
      movie,
      trailer,
      baseImgUrl
    };
  }
});
</script>

<style scoped>
.title {
  text-align: center;
  background-color: #141414;
  color: white;
  padding: 10px;
  font-size: 1.5rem;
}

.movie-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #141414;
  color: white;
  padding: 1rem;
}

.poster-container {
  width: 100%;
  max-width: 400px;
}

.poster-container img {
  width: 85%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.detail {
  text-align: center;
  margin-top: 15px;
}

.movie-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
}

.release-date {
  font-size: 1.2rem;
  color: #ff6f61;
  margin-bottom: 1rem;
}

.overview {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.overview p {
  font-size: 1rem;
  line-height: 1.5;
}

@media (min-width: 768px) {
  .movie-detail {
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
  }

  .detail {
    text-align: left;
    margin-top: 0;
    max-width: 600px;
  }
}
</style>
