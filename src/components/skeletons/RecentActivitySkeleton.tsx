export default function RecentActivitySkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-gray-300"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}