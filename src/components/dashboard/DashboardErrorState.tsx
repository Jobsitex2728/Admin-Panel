
interface DashboardErrorProps {
    onRetry?: () => void;
    errorMessage?: string;
}

export default function DashboardError({ 
    onRetry, 
    errorMessage 
}: DashboardErrorProps) {
    return (
        <div className="p-6 space-y-6">
            {/* Error Banner */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
                        <p className="text-sm text-red-700 mt-1">{errorMessage || 'aljdaskd'}</p>
                    </div>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="px-4 py-2 bg-red-100 text-red-800 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>

            {/* Header Stats Cards - Disabled/Error state */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-60">
                        <p className="text-sm text-gray-400">Total Users</p>
                        <p className="text-2xl font-bold text-gray-300">---</p>
                        <p className="text-xs text-gray-300 mt-1">vs last month</p>
                    </div>
                ))}
            </div>

            {/* Main Content Area - Two columns with error state */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Chart Card - Show error state */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">User Growth</h3>
                                <p className="text-sm text-gray-400">Data temporarily unavailable</p>
                            </div>
                        </div>

                        {/* Empty chart area with message */}
                        <div className="h-64 relative bg-gray-50 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500">Unable to load chart data</p>
                            </div>
                        </div>

                        {/* Show disabled filter buttons */}
                        <div className="flex gap-2 mt-4">
                            {['Daily', 'Weekly', 'Monthly'].map((filter) => (
                                <button
                                    key={filter}
                                    disabled
                                    className="px-3 py-1 text-sm text-gray-300 bg-gray-50 rounded-md cursor-not-allowed"
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity Table - Empty state */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                        <div className="text-center py-8">
                            <p className="text-sm text-gray-400">No activity data available</p>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Stats Card - Error state */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex justify-between items-center text-gray-300">
                                    <span>Metric {i}</span>
                                    <span>---</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Users Card - Error state */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Users</h3>
                        <div className="text-center py-6">
                            <p className="text-sm text-gray-400">Unable to load users</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}