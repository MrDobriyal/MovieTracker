import axiosTmdbApiInstance from "@/lib/axiosTmdbApiInstance";
type MovieTRecords ={
adult?:boolean,video?:boolean,language?:string,sort_by?:string,page?:number,with_original_language?:string,with_genres?:number
}


const fetchMovies = async ({adult,video,language,sort_by,page,with_original_language,with_genres}:MovieTRecords) => {
 const params:Record<string, any>={include_adult:adult??false,
    include_video:video??false,
    language:language??'en',
    with_original_language:with_original_language??'en',  //hi -for bollywood
    page:page??1,
    sort_by:sort_by??'popularity.desc',
  }
 
  if (with_genres && with_genres !== 1) { //1 means all genres
    params.with_genres = with_genres;
  }
 
  const res = await axiosTmdbApiInstance.get('/discover/movie',{params
    });
  return res.data;
};

export const fetchMovieById = async (id: number) => {
  const res = await axiosTmdbApiInstance.get(`/movie/${id}`,{
    params:{append_to_response:'videos,credits'
  }});
  return res.data;
};

const genreService = async () =>{
    const res =await axiosTmdbApiInstance.get("/genre/movie/list");
    return res.data;
}

 const fetchMovieWatchProviders = async (id: number) => {
  const res = await axiosTmdbApiInstance.get(`/movie/${id}/watch/providers`);
  return res.data.results;
};


type MovieTSearch ={
  query:string,
  adult?:boolean,
  language?:string,
  page?:number,
  with_original_language?:string,
  with_genres?:number,
}
const serchMovie =async ({query,adult,language,page,with_original_language,with_genres}:MovieTSearch) =>{
  const params:Record<string, any>={
    query:query,
    include_adult:adult??false,
    language:language??'en',
    with_original_language:with_original_language??'en',  //hi -for bollywood
    page:page??1,
  }

  if (with_genres && with_genres !== 1) { //1 means all genres
    params.with_genres = with_genres;
  }
  const res =await axiosTmdbApiInstance.get('/search/movie',{params})

  return res.data;
}
export const moviesServices={
    fetchMovies,
    genreService,
    fetchMovieById,
    serchMovie,
    fetchMovieWatchProviders
}