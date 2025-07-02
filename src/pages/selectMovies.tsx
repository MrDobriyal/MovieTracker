import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { addWatchedMovies } from '@/utils/watchedMovies';
import { Button } from '@/components/ui/button';
import { moviesServices } from '@/services/moviesSevices';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import MovieSelectionCard from '@/components/MovieSelectionCard';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import MovieCard from '@/components/MovieCard';

const SelectMovies: React.FC = () => {
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>('Popularity');
  const [filterGenre, setFilterGenre] = useState<string>('all');
  const [allMovies ,setAllMovies] =useState<any>([]);
  const [totalPages,setTotalPages] =useState(1);
  const [currentPage,setCurrentPage]=useState(1);
  const router=useRouter();
  const { user} = useAuth();

  if(!user){
    return router.push('/login');
  }
  
 async function getAllMovies(type:'previous'|'next'|'all', params: {
    adult?: boolean;
    video?: boolean;
    language?: string;
    sort_by?: string;
    page?: number;
  } = {}){
  let data;
  if(type =='all'){    
  data = await moviesServices.fetchMovies(params);
      
    }
    else if(type=="next" ||type=="previous"){
      const targetPage = params.page ?? currentPage;
      data = await moviesServices.fetchMovies({page:targetPage});
    }

      setTotalPages(data.total_pages);
      setCurrentPage(data.page);
      setAllMovies(data.results);
  }
  useEffect(()=>{
   
   getAllMovies('all');
  },[]);


  

  // Handle select/unselect one
  const toggleMovieSelection = (movieId: number) => {
    setSelectedMovies(prev =>
      prev.includes(movieId) ? prev.filter(id => id !== movieId) : [...prev, movieId]
    );
  };

  // Handle select all/deselect all
  const toggleSelectAll = () => {
    const visibleIds = allMovies.map((m:any) => m.id);
    const allSelected = visibleIds.every((id:any) => selectedMovies.includes(id));
    setSelectedMovies(allSelected ? [] : visibleIds);
  };

  const filteredAndSortedMovies =async()=> {
   
      if (sortBy === 'title') return await getAllMovies('all',{sort_by:"title.asc"})
      if (sortBy === 'year') return await getAllMovies('all',{sort_by:"primary_release_date.asc"});
      if (sortBy === 'rating') return await getAllMovies('all',{sort_by:"popularity.desc"});
      if(sortBy ==='popularity') return await getAllMovies('all',{});
      if(sortBy ==='adult') return await getAllMovies('all',{adult:true});
      return 0;
}
filteredAndSortedMovies();

  const handleAddToWatched = () => {
    if (!user) return;

    if (selectedMovies.length === 0) {
      toast("Please select at least one movie to add to your watched list.");
      return;
    }

    addWatchedMovies(user.id, selectedMovies);
    toast(`Added ${selectedMovies.length} movie${selectedMovies.length > 1 ? 's' : ''} to your watched list.`);
    setSelectedMovies([]);
  };

  // const uniqueGenres = Array.from(new Set(allMovies.map(m => m.genre))).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-red-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-white mb-6">Select Movies to Watch</h1>

        {/* Toolbar */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-300">
            <span>
              {selectedMovies.length > 0
                ? `${selectedMovies.length} movie${selectedMovies.length > 1 ? 's' : ''} selected`
                : 'Click on movies to select them'}
            </span>

            <Button
              onClick={toggleSelectAll}
              className="border-gray-600 bg-white text-black hover:bg-red-500"
            >
            Select All
            </Button>
          </div>

          <div className="flex gap-4 flex-wrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="title">Sort by Title</option>
              <option value="year">Sort by Year</option>
              <option value="rating">Sort by Rating</option>
              <option value="adult">Includes Adult</option>
            </select>

            {/* <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded"
            >
              <option value="all">All Genres</option>
              {uniqueGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select> */}

            <Button
              onClick={handleAddToWatched}
              disabled={selectedMovies.length === 0}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              <Check className="w-4 h-4 mr-2" />
              Add to Watched ({selectedMovies.length})
            </Button>
          </div>
        </div>

        {/* Movie Table */}
        {/* <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-gray-800 text-left rounded-md">
            <thead className="bg-gray-900 text-gray-300">
              <tr>
                <th className="px-4 py-2">Select</th>
                <th className="px-4 py-2">Thumbnail</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Genre</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Year</th>
              </tr>
            </thead>
            <tbody>
              {allMovies.map((movie) => (
                <MovieSelectionCard
                  key={movie.id}
                  movie={movie}
                  isSelected={selectedMovies.includes(movie.id)}
                  onClick={() => toggleMovieSelection(movie.id)}
                />
              ))}
            </tbody>
          </table>
        </div> */}
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {allMovies.map((movie:any) => (
            <MovieCard 
             key={movie.id}
                  movie={movie}
                  isSelected={selectedMovies.includes(movie.id)}
                  showCheckbox={true}
                  onClick={() => toggleMovieSelection(movie.id)}
            />
          ))}
        </div>
      </div>
      {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <Button
                    onClick={()=>{ const previousPage = currentPage - 1;
                          getAllMovies('previous', {page:previousPage}); 
                          setCurrentPage(previousPage);     
                    }}
                    disabled={currentPage === 1}
                    variant="outline"
                    className="text-gray-300 border-gray-600 hover:bg-gray-800"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex space-x-1">
                   
                      <Button type='button'>{currentPage}</Button>
                   
                  </div>
      
                  <Button
                    onClick={()=>{ const nextPage = currentPage + 1;
                          getAllMovies('next', {page:nextPage}); 
                          setCurrentPage(nextPage);     
                    }}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    className="text-gray-300 border-gray-600 hover:bg-gray-800"
                  >
                    Next
                  </Button>
                </div>
              )}
    </div>
    
  );
};

export default SelectMovies;
