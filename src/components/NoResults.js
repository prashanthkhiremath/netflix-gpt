const NoResults = () => (
  <div className="flex flex-col items-center justify-center p-10 text-white">
    <h2 className="text-2xl font-bold mb-2">Oops! No movies found.</h2>
    <p className="text-gray-400 text-center">
      Try searching for something else, like "90s Bollywood Action" or "Space Documentaries".
    </p>
  </div>
);

export default NoResults;