export default function UserGrowthSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
      </div>
      
      <div className="flex items-baseline gap-2 mb-6">
        <div className="h-8 bg-gray-300 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-24 ml-2"></div>
      </div>

      {/* Chart skeleton */}
      <div className="h-32 bg-gray-100 rounded-lg mb-6 flex items-end justify-between px-2">
        {[...Array(11)].map((_, i) => {
          const heights = [35, 45, 55, 40, 60, 50, 38, 52, 48, 42, 58];
          return (
            <div key={i} className="flex flex-col items-center w-6">
              <div 
                className="w-6 bg-gray-300 rounded-t"
                style={{ height: `${heights[i]}px` }}
              ></div>
              <div className="h-3 bg-gray-200 rounded w-6 mt-2"></div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-5 bg-gray-300 rounded w-28"></div>
      </div>
    </div>
  );
}