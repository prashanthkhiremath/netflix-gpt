import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
const VideoBackground = ({movieId}) => {

    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
    useMovieTrailer(movieId);
    // We need the playlist param to be the same as the video key for loop=1 to work
    const queryParams = `?autoplay=1&mute=1&loop=1&playlist=${trailerVideo?.key}&controls=0&rel=0&modestbranding=1`;
    
    return (
    <div className="w-screen overflow-hidden bg-black">
        <iframe
            className="w-screen aspect-video scale-150" // Scale up slightly to hide black bars/borders
            src={`https://www.youtube.com/embed/${trailerVideo?.key}${queryParams}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
    </div>
    )
}

export default VideoBackground