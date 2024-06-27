<<template>
  <ion-card class="movie-card" @click="goToDetail">
    <img :src="`${baseImgUrl}${movie.poster_path}`" alt="movie poster" class="movie-poster"/>
    <ion-card-header>
      <ion-card-title class="movie-title">{{ movie.title }}</ion-card-title>
      <ion-card-subtitle class="movie-subtitle">{{ movie.release_date }}</ion-card-subtitle>
    </ion-card-header>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

export default defineComponent({
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
  },
  props: {
    movie: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const baseImgUrl = api.baseImgUrl();

    const goToDetail = () => {
      router.push({ name: 'MovieDetail', params: { id: props.movie.id.toString() } });
    };

    return {
      baseImgUrl,
      goToDetail,
    };
  },
});
</script>

<style scoped>
.movie-card {
  border-radius: 15px; /* Bordes redondeados */
  overflow: hidden; /* Esconde el contenido que sobresale */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Transiciones suaves */
}

.movie-card:hover {
  transform: scale(1.05); /* Efecto de zoom al pasar el cursor */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada */
}

.movie-poster {
  width: 100%;
  height: 250px; /* Altura fija para la imagen */
  object-fit: cover; /* Asegura que la imagen cubra el área del contenedor */
}

.movie-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  margin: 0.5rem 0; /* Espaciado superior e inferior */
}

.movie-subtitle {
  font-size: 0.875rem;
  color: #777;
}
</style>
>