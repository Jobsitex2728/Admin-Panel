// components/jobsManagement/JobsTable.tsx
import type { Job } from "../../types/job.types";

interface JobsTableProps {
    jobs: Job[];
    onViewDetails: (job: Job) => void;
    onBlockClick: (job: Job) => void;
    isToggling: boolean;
}

export default function JobsTable({ jobs, onViewDetails, onBlockClick, isToggling }: JobsTableProps) {
    const getStatusColor = (status: Job['status']) => {
        const colors = {
            'Delivered': 'bg-green-100 text-green-800  text-center!',
            'Pending': 'bg-yellow-100 text-yellow-800  text-center!',
            'In Transit': 'bg-blue-100 text-blue-800  text-center!',
            'Dispatching': 'bg-purple-100 text-purple-800  text-center!',
            'Paused': 'bg-gray-100 text-gray-800  text-center!',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Job ID', 'Customer', 'Truck Type', 'Load Type', 'Date', 'Status', 'Actions'].map(header => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {jobs.map((job) => (
                            <tr key={job.id} className="hover:bg-gray-50 ">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {job.jobId}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-900">{job.customer.name}</div>
                                        <div className="text-gray-500">{job.customer.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {job.truckType}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {job.loadType}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {new Date(job.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${getStatusColor(job.status)}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onViewDetails(job)}
                                            className="text-blue-600 hover:text-blue-900 font-medium px-5 py-1 bg-blue-100 rounded-md"
                                        >
                                            View
                                        </button>
                                        <span className="text-gray-300">|</span>
                                        <button
                                            onClick={() => onBlockClick(job)}
                                            disabled={isToggling}
                                            className={`font-medium px-5 py-1 rounded-md ${
                                                job.blocked
                                                    ? 'text-green-600 hover:text-green-600  bg-green-100'
                                                    : 'text-red-600 hover:text-red-600  bg-red-100'
                                            } disabled:opacity-50`}
                                        >
                                            {job.blocked ? 'Unblock' : 'Block'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}