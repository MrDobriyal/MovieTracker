import axiosTmdbApiInstance from "@/lib/axiosTmdbApiInstance";

const fetchMovies = async ({adult,video,language,sort_by,page}:{adult?:boolean,video?:boolean,language?:string,sort_by?:string,page?:number}) => {
  const res = await axiosTmdbApiInstance.get('/discover/movie',{
    params:{include_adult:adult??false,
    include_video:video??false,
    language:language??'en-US',
    page:page??1,
    sort_by:sort_by??'popularity.desc',
  }});
  return res.data;
};

export const fetchMovieById = async (id: number) => {
  const res = await axiosTmdbApiInstance.get(`/movie/${id}`);
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