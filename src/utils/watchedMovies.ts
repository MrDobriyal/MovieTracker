
import { Movie } from '@/data/movies';
import { supabase } from '@/lib/supabaseClient';

const WATCHED_MOVIES_KEY = 'movieApp_watchedMovies';

export const getWatchedMovies = async (userId: string): Promise<number[]> => {
  const { data, error } = await supabase
    .from('watched_movies')
    .select('movie_id')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching watched movies:', error.message);
    return [];
  }

  return data.map((entry) => entry.movie_id);
};

export const addWatchedMovies = async (userId: string, movieIds: number[]) => {
  try {
    const inserts = movieIds.map((movieId) => ({
      user_id: userId,
      movie_id: movieId,
    }));

    const { error } = await supabase
      .from('watched_movies')
      .upsert(inserts, { onConflict: 'user_id, movie_id' }); // ensures no duplicates

    if (error) {
      console.error('Error adding watched movies:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error adding watched movies:', err);
    return false;
  }
};

export const removeWatchedMovie = async (userId: string, movieId: number): Promise<boolean> => {
  const { error } = await supabase
    .from('watched_movies')
    .delete()
    .match({ user_id: userId, movie_id: movieId });

  if (error) {
    console.error('Error removing watched movie:', error.message);
    return false;
  }

  return true;
};

export const isMovieWatched = async (userId: string, movieId: number): Promise<boolean> => {
  const { data, error } = await supabase
    .from('watched_movies')
    .select('id')
    .eq('user_id', userId)
    .eq('movie_id', movieId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
    console.error('Error checking movie watched status:', error.message);
  }

  return !!data;
};
