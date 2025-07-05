import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { moviesServices } from '@/services/moviesSevices';

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<any>(null);

 useEffect(() => {
    if (id) {
        async function fetchData(){
      const data =await moviesServices.fetchMovieById(Number(id));
      setMovie(data);
        }
        fetchData();
    }
  }, [id]);

  if (!movie) return <div className="text-white p-6">Loading...</div>;

  const trailer = movie.videos?.results?.find(
    (v:any) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  return (
    <div className="text-white px-6 py-8 max-w-6xl mx-auto space-y-6 bg-accent-foreground">
      {/* Backdrop */}
      {movie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="Backdrop"
          className="rounded-lg w-full max-h-[500px] object-cover"
        />
      )}

      {/* Title + Tagline */}
      <div>
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        {movie.tagline && <p className="text-lg italic text-gray-400">{movie.tagline}</p>}
      </div>
      <div className='flex overflow-auto gap-3'>
      {movie.credits.cast.map((actor:any) => (
    <div key={actor.id} className="flex-shrink-0 w-24 text-center">
      <img
        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
        alt={actor.name}
        className="w-24 h-24 object-cover rounded-full mx-auto border border-gray-700"
      />
      <p className="mt-2 text-sm text-white truncate">{actor.name}</p>
      <p className="text-xs text-gray-400 truncate">as {actor.character}</p>
    </div>
  ))}
  </div>

      {/* Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Info */}
        <div className="space-y-2">
          <p className="text-gray-300">{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} min</p>
          <p><strong>Language:</strong> {movie.spoken_languages.map((l:any) => l.english_name).join(', ')}</p>
          <p><strong>Genres:</strong> {movie.genres.map((g:any) => g.name).join(', ')}</p>
          <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
          <p><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>
          <p><strong>Status:</strong> {movie.status}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average} ({movie.vote_count} votes)</p>

          {/* Links */}
          <div className="mt-2 space-x-4">
            {movie.homepage && (
              <a href={movie.homepage} target="_blank" className="text-blue-400 underline">
                Official Website
              </a>
            )}
            {movie.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                className="text-yellow-400 underline"
              >
                IMDb
              </a>
            )}
          </div>

          {/* Collection */}
          {movie.belongs_to_collection && (
            <div className="mt-4">
              <p><strong>Part of:</strong> {movie.belongs_to_collection.name}</p>
              {movie.belongs_to_collection.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.belongs_to_collection.poster_path}`}
                  alt="Collection Poster"
                  className="mt-2 w-32 rounded"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Production Companies */}
      {movie.production_companies?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-6">Production Companies</h2>
          <div className="flex flex-wrap gap-4 mt-2">
            {movie.production_companies.map((company:any) => (
              <div key={company.id} className="text-center w-32">
                {company.logo_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    className="mx-auto mb-1 max-h-12 object-contain"
                  />
                ) : (
                  <div className="text-sm text-gray-400 italic">No Logo</div>
                )}
                <p className="text-sm text-gray-300">{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* YouTube Trailer */}
      {trailer && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Trailer</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      )}
      <div className="overflow-x-auto flex gap-4 px-2 pb-2 scrollbar-hide">
</div>
    </div>
  );
};

export default MovieDetail;
