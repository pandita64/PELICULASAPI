import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const BASE_IMG = "https://image.tmdb.org/t/p/w500/";
const APIKEY = "492d218f089fd8c20e9c3a945b482a9f";
const LANGUAGE = "es-CO";

function formatReleaseDate(original_date: string): string {
  const months = [
    { id: 1, name: "enero" },
    { id: 2, name: "febrero" },
    { id: 3, name: "marzo" },
    { id: 4, name: "abril" },
    { id: 5, name: "mayo" },
    { id: 6, name: "junio" },
    { id: 7, name: "julio" },
    { id: 8, name: "agosto" },
    { id: 9, name: "septiembre" },
    { id: 10, name: "octubre" },
    { id: 11, name: "noviembre" },
    { id: 12, name: "diciembre" },
  ];

  const [year, month, day] = original_date.split("-");
  const monthName = months.find(m => m.id === parseInt(month))?.name;

  if (monthName) {
    return `${day} de ${monthName} de ${year}`;
  }
  return original_date;
}

// Exporta las funciones para interactuar con la API de TMDb
export default {
  // Obtiene los géneros de películas disponibles
  async getGenres() {
    try {
      const response = await axios.get(`${BASE_URL}genre/movie/list`, {
        params: {
          api_key: APIKEY,
          language: LANGUAGE
        }
      });
      return response.data.genres;
    } catch (error) {
      console.error('Error al buscar géneros:', error);
      throw new Error('Error al buscar géneros. Inténtalo de nuevo más tarde.');
    }
  },

  // Obtiene películas filtradas por género
  async getMoviesFilteredByGenre(genre_id: string, page: number) {
    try {
      const response = await axios.get(`${BASE_URL}discover/movie`, {
        params: {
          api_key: APIKEY,
          language: LANGUAGE,
          with_genres: genre_id,
          page: page
        }
      });
      const movies = response.data.results.map((movie: any) => ({
        ...movie,
        release_date: formatReleaseDate(movie.release_date)
      }));
      return movies;
    } catch (error) {
      console.error('Error al buscar películas por género:', error);
      throw new Error('Error al buscar películas por género. Inténtalo de nuevo más tarde.');
    }
  },

  // Obtiene películas por categoría (e.g., popular, top_rated, now_playing)
  async getMoviesByCategory(category: string, page: number) {
    // Validar que la categoría es una de las permitidas
    const validCategories = ['popular', 'top_rated', 'now_playing', 'upcoming'];
    if (!validCategories.includes(category)) {
      throw new Error(`Categoría "${category}" no es válida. Las categorías válidas son: ${validCategories.join(', ')}`);
    }

    try {
      const response = await axios.get(`${BASE_URL}movie/${category}`, {
        params: {
          api_key: APIKEY,
          language: LANGUAGE,
          page: page
        }
      });
      const movies = response.data.results.map((movie: any) => ({
        ...movie,
        release_date: formatReleaseDate(movie.release_date)
      }));
      return {
        results: movies,
        total_pages: response.data.total_pages
      };
    } catch (error) {
      console.error(`Error al buscar películas por categoría "${category}":`, error);
      throw new Error(`Error al buscar películas por categoría "${category}". Inténtalo de nuevo más tarde.`);
    }
  },

  // Obtiene los detalles de una película específica
  async getMovieDetail(id: string) {
    try {
      const response = await axios.get(`${BASE_URL}movie/${id}`, {
        params: {
          api_key: APIKEY,
          language: LANGUAGE
        }
      });
      const movie = response.data;
      movie.release_date = formatReleaseDate(movie.release_date);
      return movie;
    } catch (error) {
      console.error('Error al recuperar los detalles de la película:', error);
      throw new Error('Error al recuperar los detalles de la película. Inténtalo de nuevo más tarde.');
    }
  },

  // Obtiene los trailers de una película específica
  async getMovieTrailer(id: string) {
    try {
      const response = await axios.get(`${BASE_URL}movie/${id}/videos`, {
        params: {
          api_key: APIKEY,
          language: LANGUAGE
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error al recuperar avances de películas:', error);
      throw new Error('Error al recuperar avances de películas. Inténtalo de nuevo más tarde.');
    }
  },

  // Devuelve la URL base para las imágenes
  baseImgUrl() {
    return BASE_IMG;
  }
};
