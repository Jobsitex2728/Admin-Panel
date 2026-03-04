export default function DocumentsSkeleton() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div>
                    <div className="h-8 w-96 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-2"></div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    {[1, 2].map(i => (
                        <div key={i} className="bg-white rounded-lg p-6 h-96 animate-pulse"></div>
                    ))}
                </div>
                <div className="bg-white rounded-lg p-6 h-64 animate-pulse"></div>
            </div>
        </div>
    );
}