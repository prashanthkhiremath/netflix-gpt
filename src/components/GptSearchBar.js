import { useDispatch, useSelector } from "react-redux"
import lang from "../utils/languageConstants";
import { useRef } from "react";
import client from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";
import { setShowShimmer } from "../utils/gptSlice";


function GptSearchBar() {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
        'https://api.themoviedb.org/3/search/movie?query=' 
        + movie + 
        '&include_adult=false&language=en-US&page=1', 
        API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  }

  const handleGptSearchClick = async() => {

    dispatch(setShowShimmer(true));

    try {
        const gptQuery = "Act as a movie recomnedation system and suggest some movies for the query:" + searchText.current.value + ". only give me names of 5 movie,comma seperated like the example result given ahea. Example Result: Gadar, Shole, Don, Golmaal, Koi Mil Gaya";

        const gptResults = await client.chat.completions.create({
            // Use one of these valid Groq Model IDs:
            messages: [{ role: "user", content: gptQuery }],
            model: "llama-3.3-70b-versatile", 
        });

        if(!gptResults.choices) {
            // TODO: Write Error Handling
        }

        const getMovies = gptResults.choices[0]?.message?.content.split(',');

        // For each movie I will search TMDB API

        const promisArray = getMovies.map(movie=> searchMovieTMDB(movie));
        
        const tmdbResults = await Promise.all(promisArray);
        
        dispatch(addGptMoviesResult({movieNames:getMovies,movieResults:tmdbResults}))

    }catch(e){
        dispatch(setShowShimmer(false));
    }


}
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12'
            onSubmit={(e)=>e.preventDefault()}>
            <input
                ref={searchText}
                type='text'
                className='p-4 m-4 col-span-9'
                placeholder={lang[langKey].gptSearchPlaceholder}
            />
            <button
                onClick={handleGptSearchClick} 
                className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'>
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar