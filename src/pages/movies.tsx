import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from '@/components/MovieCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { moviesServices } from '@/services/moviesSevices';


const Movies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [apiMovies, setApiMovies] = useState<any[]>([]);
  const [totalPages,setTotalPages]=useState(1);
  const [totalMovies,setTotalMovies]=useState(1);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [movieType,setMovieType] =useState<'en'|'hi'>('en');
  
   const fetchMovies = async (params: {
    adult?: boolean;
    video?: boolean;
    language?: string;
    sort_by?: string;
    page?: number;
    with_original_language?:string
  } = {}) => {
      try {
        if(params.with_original_language==="hi"){
          setMovieType("hi");
        }else{
            setMovieType("en");
        }

        setLoading(true);
        const response = await moviesServices.fetchMovies(params);
        setApiMovies(response.results || []);
        setCurrentPage(response.page);
        setTotalPages(response.total_pages);
        setTotalMovies(response.total_results);
       
      } catch (err: any) {
        setApiError('Failed to load movies from API.');
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
   

    fetchMovies();
  }, [setCurrentPage]);


  // ✅ Filtered by search
  const filteredMovies = useMemo(() => {
    return apiMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, apiMovies]);

  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset page when searching
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-red-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-6">Browse Movies</h1>
          <div className='flex gap-2 mb-4 justify-center sm:justify-start'>
          <Button type='button' className='bg-red-600 hover:bg-red-400' onClick={()=> {

            fetchMovies({with_original_language:"en"})}}>Hollywood</Button>
          <Button type='button' className='bg-red-600 hover:bg-red-400' onClick={()=> {
           
            fetchMovies({with_original_language:"hi"})}}>Bollywood</Button>
          </div>
        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        {/* Status / Loading / Error */}
        {loading && <p className="text-gray-400">Loading movies...</p>}
        {apiError && <p className="text-red-400">{apiError}</p>}

        {/* Results Info */}
        {!loading && !apiError && (
          <p className="text-gray-400 mb-6">
            Showing {apiMovies.length} of {totalMovies} movie
            {totalMovies !== 1 && 's'}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        )}

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {apiMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} descriptionOpen={true} />
          ))}
        </div>

        {/* No results */}
        {!loading && filteredMovies.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No movies found matching your search.
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
                       <div className="flex justify-center items-center space-x-2">
                         <Button
                           onClick={()=>{ const previousPage = currentPage - 1;
                                 fetchMovies({page:previousPage,with_original_language:movieType =="hi"?"hi":"en"}); 
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
                                 fetchMovies({page:nextPage, with_original_language:movieType =="hi"?"hi":"en"}); 
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
    </div>
  );
};

export default Movies;
