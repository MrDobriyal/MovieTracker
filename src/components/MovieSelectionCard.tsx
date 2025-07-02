import React from 'react';
import { Movie } from '@/data/movies';
import { genres } from '@/data/movies';
interface MovieRowProps {
  movie: Movie;
  isSelected?: boolean;
  onClick?: () => void;
}

const MovieSelectionCard: React.FC<MovieRowProps> = ({
  movie,
  isSelected = false,
  onClick,
}) => {

  function genreTitle(ids:number[]){
   return ids.map((id,index)=>{
      const genre =genres.find(g=>g.id===id);
      const seperator=index==ids.length-1?" ":", "
      return genre ? genre.name +seperator:null;
    });
  }
  return (
    <tr
      className={`cursor-pointer hover:bg-gray-700 transition-colors ${
        isSelected ? 'bg-red-900/40' : ''
      }`}
      onClick={onClick}
    >
      <td className="px-4 py-2">
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          className="accent-red-600 w-5 h-5"
        />
      </td>
      <td className="px-4 py-2">
        <img
          src={'https://image.tmdb.org/t/p/w500'+movie.poster_path}
          alt={movie.title}
          className="w-12 h-18 object-cover rounded"
        />
      </td>
      <td className="px-4 py-2 text-white">{movie.title}</td>
      <td className="px-4 py-2 text-gray-300">{genreTitle(movie.genre_ids)}</td>
      <td className="px-4 py-2 text-gray-300">⭐ {movie.vote_average}</td>
      <td className="px-4 py-2 text-gray-400">{movie.release_date}</td>
    </tr>
  );
};

export default MovieSelectionCard;