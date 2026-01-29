const VideoTitle = ({title,overview}) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-12 absolute text-white bg-gradient-to-r from-black via-transparent to-transparent z-10">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-2xl mb-4">
            {title}
        </h1>
        <p className="hidden md:inline-block text-lg w-1/3 leading-snug drop-shadow-md">
            {overview}
        </p>
        <div className="flex gap-4 mt-8">
            {/* Play Button */}
            <button className="flex items-center bg-white text-black py-2 px-8 text-xl font-bold rounded-md transition-all duration-200 hover:bg-opacity-80 hover:scale-105 active:scale-95 shadow-lg">
                <span className="text-2xl mr-2 transform rotate-90 leading-none">▲</span> 
                Play
            </button>

            {/* More Info Button */}
            <button className="flex items-center bg-gray-500/70 text-white py-2 px-8 text-xl font-bold rounded-md transition-all duration-200 backdrop-blur-md">
                More Info
            </button>
        </div>
    </div>
  )
}

export default VideoTitle