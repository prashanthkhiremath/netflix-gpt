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
            <button className="bg-white text-black py-2 px-10 text-xl font-bold rounded-md hover:bg-opacity-80 transition">
            ▶️ Play
            </button>
            <button className="bg-gray-500/50 text-white py-2 px-10 text-xl font-bold rounded-md hover:bg-gray-600 transition backdrop-blur-sm">
            ℹ️ More Info
            </button>
        </div>
    </div>
  )
}

export default VideoTitle