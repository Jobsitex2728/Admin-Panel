export default function DriverProfileSkeleton() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div>
                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mt-2"></div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Left column skeleton */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mt-4"></div>
                            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mt-2"></div>
                        </div>
                    </div>
                </div>

                {/* Middle column skeleton */}
                <div className="col-span-2 space-y-6">
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white rounded-lg p-4 h-24 animate-pulse"></div>
                        ))}
                    </div>
                    <div className="bg-white rounded-lg p-6 h-64 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}