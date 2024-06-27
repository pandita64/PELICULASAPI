<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <GoHomeButton/>
        </ion-buttons>
      </ion-toolbar>
      <ion-title class="title">{{ getTitle() }}</ion-title>
    </ion-header>
    <ion-content>
      <div class="movies-grid">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @click="goToMovieDetail(movie.id)"
        />
      </div>
      <div class="pagination">
        <ion-pagination
          :totalPages="totalPages"
          :currentPage="currentPage"
          @page-changed="handlePageChanged"
        />
      </div>
      <div v-if="error">
        <p>{{ error }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';
import MovieCard from '@/components/MovieCard.vue';
import IonPagination from '@/components/IonPagination.vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons } from '@ionic/vue';
import GoHomeButton from '@/components/GoHomeButton.vue';

export default defineComponent({
  components: {
    MovieCard,
    IonPagination,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    GoHomeButton
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const movies = ref<any[]>([]);
    const totalPages = ref(5);
    const currentPage = ref(1);
    const error = ref<string | null>(null);
    const genres = ref<any[]>([]); // Aquí se cargan los géneros

    // Obtiene géneros desde la API
    const fetchGenres = async () => {
      genres.value = await api.getGenres();
    };

    const fetchMovies = async () => {
      try {
        const filter = route.query.filter as string;
        const id = route.query.id as string;

        if (!filter) {
          throw new Error('Falta el parámetro de filtro');
        }

        let fetchedMovies;
        if (filter === 'genre' && id) {
          fetchedMovies = await api.getMoviesFilteredByGenre(id, currentPage.value);
        } else {
          const response = await api.getMoviesByCategory(filter, currentPage.value);
          fetchedMovies = response.results;
          totalPages.value = response.total_pages;
        }

        movies.value = fetchedMovies;
        error.value = null;
      } catch (err) {
        console.error('Error al recuperar películas:', err);
        error.value = 'Error al obtener películas. Por favor, inténtelo de nuevo más tarde.';
      }
    };

    const goToMovieDetail = (movieId: number) => {
      router.push({ name: 'MovieDetail', params: { id: movieId.toString() } });
    };

    const handlePageChanged = (page: number) => {
      currentPage.value = page;
      fetchMovies();
    };

    

    const getTitle = () => {
      const filter = route.query.filter as string;
      const id = route.query.id as string;

      if (filter === 'genre' && id) {
        const genre = genres.value.find((g: any) => g.id.toString() === id);
        return genre ? `Películas del Género: ${genre.name}` : 'Películas por Género';
      } else if (filter === 'now_playing') {
        return 'Películas en Cartelera';
      } else if (filter === 'top_rated') {
        return 'Mejor Calificadas';
      } else if (filter === 'popular') {
        return 'Películas Populares';
      } else {
        return 'Películas';
      }
    };

    onMounted(() => {
      if (route.query.filter) {
        fetchMovies();
      }
      fetchGenres();
    });

    watch(
      () => [route.query.filter, route.query.id],
      () => {
        if (route.query.filter) {
          currentPage.value = 1; 
          fetchMovies();
        }
      },
      { immediate: true }
    );

    return {
      movies,
      totalPages,
      currentPage,
      error,
      goToMovieDetail,
      handlePageChanged,
      getTitle,
      
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

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #141414;
  color: white;
}

.movie-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 1.5rem;
}

.pagination ion-pagination {
  max-width: 300px;
}

.error {
  text-align: center;
  color: red;
  padding: 1rem;
}
</style>
