import { genres } from '@/data/movies'; 
 
 export function genreTitle(ids:number[]){
   return ids.map((id,index)=>{
      const genre =genres.find(g=>g.id===id);
      const seperator=index==ids.length-1?" ":", "
      return genre ? genre.name +seperator:null;
    });
  }