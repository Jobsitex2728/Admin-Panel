
const DashboardSkeleton = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Header Stats Cards - 4 cards in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                ))}
            </div>

            {/* Main Content Area - Two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Takes 2/3 width */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Chart Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        {/* Card Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Chart Area - Matching the 8,8,8,8,9-5,0.8 pattern */}
                        <div className="h-64 relative">
                            {/* Y-axis labels */}
                            <div className="absolute -left-6 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                                {[ '1k', '800', '600', '400', '200', '0' ].map((_, i) => (
                                    <div key={i} className="h-3 w-8 bg-gray-200 rounded animate-pulse"></div>
                                ))}
                            </div>

                            {/* Chart bars */}
                            <div className="ml-6 h-full flex items-end justify-around">
                                {[ '65%', '70%', '75%', '80%', '85%', '30%' ].map((height, i) => (
                                    <div key={i} className="flex flex-col items-center w-12">
                                        <div 
                                            className="w-8 bg-linear-to-t from-blue-400 to-blue-300 rounded-t animate-pulse"
                                            style={{ height: height }}
                                        >
                                            {/* Value on top of bar */}
                                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                        {/* X-axis label */}
                                        <div className="mt-4 h-3 w-10 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Takes 1/3 width */}
                <div className="space-y-6">
                    {/* Stats Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="h-5 w-36 bg-gray-200 rounded animate-pulse mb-4"></div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Users Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="flex-1">
                                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;