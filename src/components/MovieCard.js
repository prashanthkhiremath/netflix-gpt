import { IMG_CDN_URL } from '../utils/constants'

function MovieCard({ posterPath }) {
  if (!posterPath) return null;

  return (
    <div className='w-36 md:w-48 pr-4 flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:z-50'>
      <img 
        className='rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.8)]'
        alt='Movie Card' 
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  )
}

export default MovieCard