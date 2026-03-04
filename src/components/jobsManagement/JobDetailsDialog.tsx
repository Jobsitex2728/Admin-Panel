import { X } from "lucide-react";
import type { Job } from "../../types/job.types";


interface JobDetailsDialogProps {
    job: Job | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function JobDetailsDialog({ job, isOpen, onClose }: JobDetailsDialogProps) {
    if (!isOpen || !job) return null;

    const getStatusColor = (status: Job['status']) => {
        const colors = {
            'Delivered': 'bg-green-100 text-green-800',
            'Pending': 'bg-yellow-100 text-yellow-800',
            'In Transit': 'bg-blue-100 text-blue-800',
            'Dispatching': 'bg-purple-100 text-purple-800',
            'Paused': 'bg-gray-100 text-gray-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl ">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Job Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500">Job ID</p>
                            <p className="text-lg font-medium text-gray-900">{job.jobId}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusColor(job.status)}`}>
                            {job.status}
                        </span>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Customer Information</h3>
                        <div className="space-y-2">
                            <p className="text-sm">
                                <span className="text-gray-500">Name:</span>{' '}
                                <span className="text-gray-900">{job.customer.name}</span>
                            </p>
                            <p className="text-sm">
                                <span className="text-gray-500">Email:</span>{' '}
                                <span className="text-gray-900">{job.customer.email}</span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Truck Information</h3>
                            <div className="space-y-2">
                                <p className="text-sm">
                                    <span className="text-gray-500">Type:</span>{' '}
                                    <span className="text-gray-900">{job.truckType}</span>
                                </p>
                                <p className="text-sm">
                                    <span className="text-gray-500">Load Type:</span>{' '}
                                    <span className="text-gray-900">{job.loadType}</span>
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Schedule</h3>
                            <div className="space-y-2">
                                <p className="text-sm">
                                    <span className="text-gray-500">Date:</span>{' '}
                                    <span className="text-gray-900">{new Date(job.date).toLocaleDateString()}</span>
                                </p>
                                <p className="text-sm">
                                    <span className="text-gray-500">Blocked:</span>{' '}
                                    <span className={job.blocked ? 'text-red-600' : 'text-green-600'}>
                                        {job.blocked ? 'Yes' : 'No'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}