import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

function GptSearch() {
  return (
    <div>
      <div className='fixed inset-0 -z-10'>
          <img
            className='w-full h-full object-cover'
            src={BG_URL}
            alt="background"
          />
      </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch