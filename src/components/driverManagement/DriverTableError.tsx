interface DriverTableErrorProps {
    onRetry: () => void;
}

export default function DriverTableError({ onRetry }: DriverTableErrorProps) {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-red-800">Failed to load drivers</h3>
                <p className="mt-2 text-sm text-red-600">There was an error loading the drivers data. Please try again.</p>
                <button 
                    onClick={onRetry} 
                    className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}