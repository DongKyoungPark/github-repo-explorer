export default function SkeletonLoader({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 animate-pulse"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div className="h-6 bg-gray-700 rounded w-3/4 md:w-1/3"></div>
            <div className="flex items-center mt-2 md:mt-0">
              <div className="h-5 bg-gray-700 rounded w-16 mr-4"></div>
              <div className="h-5 bg-gray-700 rounded w-20"></div>
            </div>
          </div>

          <div className="h-4 bg-gray-700 rounded w-full mb-2.5"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2.5"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>

          <div className="flex flex-wrap justify-between items-center">
            <div className="h-4 bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </>
  );
}
