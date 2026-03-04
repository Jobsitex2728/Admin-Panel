// components/jobsManagement/JobsManagementSkeleton.tsx
export default function JobsManagementSkeleton() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-2"></div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-12 bg-gray-200 rounded animate-pulse mb-2"></div>
                ))}
            </div>
        </div>
    );
}