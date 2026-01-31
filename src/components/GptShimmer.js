import ShimmerCard from "./ShimmerCard";

const GptShimmer = () => {
  return (
    <div className="p-4 m-4 bg-black">
      {[1, 2, 3].map((n) => (
        <div key={n} className="px-6 mb-8">
          {/* Shimmer for the Title */}
          <div className="h-8 w-48 bg-gray-800 mb-4 rounded animate-pulse"></div>
          {/* Shimmer for the horizontal Scroll */}
          <div className="flex overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((m) => (
              <ShimmerCard key={m} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GptShimmer;