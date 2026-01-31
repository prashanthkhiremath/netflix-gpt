import { useSelector } from "react-redux"
import MovieList from "./MovieList"
import GptShimmer from "./GptShimmer"
import NoResults from "./NoResults";

function GptMovieSuggestions() {

  const { movieResults, movieNames, showShimmer } = useSelector((store) => store.gpt);
  
  // Show shimmer if we are in a loading state
  if (showShimmer) return <GptShimmer />;

  // If no names and not loading, don't show anything
  if (!movieNames) return null;

  // Case: Search finished but arrays are empty or results didn't load
  if (movieNames.length === 0 || !movieResults || movieResults[0]?.length === 0) {
    return <NoResults />;
  }
  
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-70">
      <div>
        {movieNames.map((movieName,index) => (
          <MovieList
            key={movieName} 
            title={movieName} 
            movies={movieResults[index]} /> 
        ))}
      </div>
    </div>
  )
}

export default GptMovieSuggestions