import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getWatchedMovies, removeWatchedMovie } from '@/utils/watchedMovies';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { moviesServices } from '@/services/moviesSevices';
import { useRouter } from 'next/router';
const WatchedMovies: React.FC = () => {
  const { user } = useAuth();
  const location =useRouter();
  const [allMovies, setAllMovies] = useState<any>([]);
   const [watched, setWatched] = useState<number[]>([]);
 
  useEffect(() => {
     user ? getWatchedMovies(user.id).then(setWatched) : [];
  }, [user]);
 
if(!user){
  return location.push('/login');
}
  const fetchWatchedMovies = async (ids: number[]) => {
    try {
      const promises = ids.map((id) => moviesServices.fetchMovieById(id));
      const data = await Promise.all(promises);
      setAllMovies(data);
    } catch (err) {
      console.error('Failed to fetch watched movies:', err);
    }
  };

  useEffect(() => {
    if (user && watched.length > 0) {
      fetchWatchedMovies(watched);
    }
  }, [user, watched]);

  const handleRemoveMovie = (movieId: number) => {
    if (!user) return;
    removeWatchedMovie(user.id, movieId);
    setAllMovies((prev:any) => prev.filter((m:any) => m.id !== movieId));
    const movie = allMovies.find((m:any) => m.id === movieId);
    toast(`"${movie?.title}" has been removed from your watched list.`);
  };

  if (!user || watched.length === 0 || allMovies.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-red-900">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">My Watched Movies</h1>
          <p className="text-lg text-gray-400 mb-6">No movies watched yet. Start watching!</p>
          <Button onClick={() => (window.location.href = '/selectMovies')} className="bg-red-600 hover:bg-red-700">
            Select Movies to Watch
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-red-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-6">My Watched Movies</h1>
        <p className="text-gray-400 mb-6">
          You've watched {allMovies.length} movie{allMovies.length > 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMovies.map((movie: any) => (
            <Card key={movie.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-24 h-36 flex-shrink-0">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{movie.title}</h3>
                      <p className="text-sm text-gray-400 mb-1">{movie.release_date?.split('-')[0]} • {movie.genre_ids?.join(', ')}</p>
                      <p className="text-sm text-gray-400">⭐ {movie.vote_average}</p>
                    </div>
                    <Button
                      onClick={() => handleRemoveMovie(movie.id)}
                      variant="outline"
                      size="sm"
                      className="mt-3 text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchedMovies;
