// lib/axiosInstance.ts
import axios from 'axios';

const axiosTmdbApiInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, 
  },
});

export default axiosTmdbApiInstance;