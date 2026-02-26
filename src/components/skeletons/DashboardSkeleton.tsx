import StatsCardSkeleton from './StatsCardSkeleton';
import UserGrowthSkeleton from './UserGrowthSkeleton';
import RecentActivitySkeleton from './RecentActivitySkeleton';
import QuickActionsSkeleton from './QuickActionsSkeleton';

export default function DashboardSkeleton() {
  return (
    <div className="p-6">
      {/* Header skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>

      {/* User growth skeleton */}
      <UserGrowthSkeleton />

      {/* Bottom grid skeleton */}
      <div className="grid grid-cols-2 gap-6">
        <RecentActivitySkeleton />
        <QuickActionsSkeleton />
      </div>
    </div>
  );
}