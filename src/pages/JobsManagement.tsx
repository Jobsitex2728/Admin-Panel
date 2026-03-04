import { useState } from "react";
import { useExportJobsMutation, useGetJobsQuery, useToggleJobBlockMutation } from "../redux/services/jobsApi";
import { TruckType, type Job } from "../types/job.types";
import JobsManagementSkeleton from "../components/jobsManagement/JobsManagementSkeleton";
import JobsManagementError from "../components/jobsManagement/JobsManagementError";
import JobDetailsDialog from "../components/jobsManagement/JobDetailsDialog";
import BlockConfirmDialog from "../components/jobsManagement/BlockConfirmDialog";
import JobsPagination from "../components/jobsManagement/JobsPagination";
import JobsTable from "../components/jobsManagement/JobsTable";
import { ArrowDown, ChevronDown, SearchIcon } from "lucide-react";



export default function JobsManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTruckType, setSelectedTruckType] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, error, refetch } = useGetJobsQuery({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        truckType: selectedTruckType,
    });

    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [jobToBlock, setJobToBlock] = useState<{ job: Job; action: 'block' | 'unblock' } | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);

    const [toggleBlock, { isLoading: isToggling }] = useToggleJobBlockMutation();
    const [exportJobs, { isLoading: isExporting }] = useExportJobsMutation();

    const handleViewDetails = (job: Job) => {
        setSelectedJob(job);
        setIsDetailsOpen(true);
    };

    const handleBlockClick = (job: Job) => {
        setJobToBlock({ job, action: job.blocked ? 'unblock' : 'block' });
        setIsBlockDialogOpen(true);
    };

    const handleBlockConfirm = async () => {
        if (!jobToBlock) return;
        try {
            await toggleBlock({
                id: jobToBlock.job.id,
                blocked: !jobToBlock.job.blocked,
            }).unwrap();
            setIsBlockDialogOpen(false);
            setJobToBlock(null);
        } catch (error) {
            console.error('Failed to toggle block status:', error);
        }
    };

    const handleExport = async (params: { search?: string; truckType?: string }) => {
        try {
            const blob = await exportJobs(params).unwrap();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `jobs-export-${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to export jobs:', error);
        }
    };

    const closeDialogs = (type: 'details' | 'block') => {
        if (type === 'details') {
            setIsDetailsOpen(false);
            setSelectedJob(null);
        } else {
            setIsBlockDialogOpen(false);
            setJobToBlock(null);
        }
    };

    const truckTypes = data?.data
        ? ['All', ...Object.values(TruckType)]
        : ['All'];

    if (isLoading) return <JobsManagementSkeleton />;
    if (error) return <JobsManagementError onRetry={refetch} />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Jobs Management</h1>
                <p className="text-sm text-gray-600 mt-1">Manage and track all your jobs</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1 min-w-75">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by job ID, customer name, or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <SearchIcon className=" absolute left-3 top-2 text-gray-400" />
                        </div>
                    </div>

                    <div className="w-48 relative group">
                        <select
                            value={selectedTruckType}
                            onChange={(e) =>
                                setSelectedTruckType(e.target.value === "All" ? "" : e.target.value)
                            }
                            className="w-full px-3 py-2 appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {truckTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type === "All" ? "All Truck Types" : type}
                                </option>
                            ))}
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronDown
                                className="h-4 w-4 text-gray-400 transition-transform duration-200 ease-in-out group-focus-within:rotate-180"
                            />
                        </div>
                    </div>

                    {/* Export Button */}
                    <button
                        onClick={() => handleExport({ search: searchTerm, truckType: selectedTruckType })}
                        disabled={isExporting}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
                    >
                        {isExporting ? (
                            <span>Exporting...</span>
                        ) : (
                            <>
                                <ArrowDown />
                                Export Report
                            </>
                        )}
                    </button>
                </div>
            </div>

            <JobsTable
                jobs={data?.data || []}
                onViewDetails={handleViewDetails}
                onBlockClick={handleBlockClick}
                isToggling={isToggling}
            />

            {data && data.pagination.total > 0 && (
                <JobsPagination
                    currentPage={currentPage}
                    totalItems={data.pagination.total}
                    pageSize={10}
                    onPageChange={setCurrentPage}
                />
            )}

            <JobDetailsDialog
                job={selectedJob}
                isOpen={isDetailsOpen}
                onClose={() => closeDialogs('details')}
            />

            <BlockConfirmDialog
                isOpen={isBlockDialogOpen}
                jobId={jobToBlock?.job.jobId || ''}
                currentBlocked={jobToBlock?.job.blocked || false}
                onConfirm={handleBlockConfirm}
                onCancel={() => closeDialogs('block')}
            />
        </div>
    );
}