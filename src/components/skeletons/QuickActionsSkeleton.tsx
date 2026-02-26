export default function QuickActionsSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-28 mb-4"></div>
      
      <div className="space-y-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
            <div className="p-2 bg-gray-200 rounded-lg w-8 h-8"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
}