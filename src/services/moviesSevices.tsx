import axiosTmdbApiInstance from "@/lib/axiosTmdbApiInstance";

const fetchMovies = async ({adult,video,language,sort_by,page,with_original_language}:{adult?:boolean,video?:boolean,language?:string,sort_by?:string,page?:number,with_original_language?:string}) => {
  const res = await axiosTmdbApiInstance.get('/discover/movie',{
    params:{include_adult:adult??false,
    include_video:video??false,
    language:language??'en',
    with_original_language:with_original_language??'en',  //hi -for bollywood
    page:page??1,
    sort_by:sort_by??'popularity.desc',
  }});
  return res.data;
};

export const fetchMovieById = async (id: number) => {
  const res = await axiosTmdbApiInstance.get(`/movie/${id}`,{
    params:{append_to_response:'videos'
  }});
  return res.data;
};

const genreService = async () =>{
    const res =await axiosTmdbApiInstance.get("/genre/movie/list");
    return res.data;
}
export const moviesServices={
    fetchMovies,
    genreService,
    fetchMovieById
}