import React from 'react';
import { useRouter } from 'next/router'; // or from 'next/navigation' if using app directory
import { Movie } from '@/data/movies';
import { Card, CardContent } from '@/components/ui/card';
import { genreTitle } from '@/utils/helper';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
  isSelected?: boolean;
  showCheckbox?: boolean;
  descriptionOpen?:boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  onClick, 
  isSelected = false, 
  showCheckbox = false ,
  descriptionOpen=false
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (descriptionOpen) {
      router.push(`/movie/${movie.id}`);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Card 
      className={`bg-gray-800 border-gray-700 hover:border-red-500 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        isSelected ? 'ring-2 ring-red-500 border-red-500' : ''
      }`}
      onClick={handleClick}
    >
      <CardContent className="p-0 relative">
        {showCheckbox && (
          <div className="absolute top-2 right-2 z-10">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              isSelected 
                ? 'bg-red-600 border-red-600' 
                : 'bg-transparent border-gray-400'
            }`}>
              {isSelected && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        )}
        <div className="aspect-[2/3] overflow-hidden rounded-t-lg">
          <img
            src={'https://image.tmdb.org/t/p/w500'+movie.poster_path}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
       
        <div className="p-4">
          <h3 className="font-semibold text-white mb-1 truncate">{movie.title}</h3>
           
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{movie.release_date}</span>
            <span>⭐ {movie.vote_average}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{genreTitle(movie.genre_ids)}</p>
        

        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
