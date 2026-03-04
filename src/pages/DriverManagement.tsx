import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Download } from 'lucide-react';
import { useExportDriversMutation, useGetDriversQuery, useToggleDriverBlockMutation } from '../redux/services/driverApi';
import type { DriverListItem } from '../types/driver.types';
import SearchInput from '../components/shared/SearchInput';
import Button from '../components/shared/Button';
import StatusBadge from '../components/shared/StatusBadge';
import Avatar from '../components/shared/Avatar';
import DriverTableSkeleton from '../components/driverManagement/DriverTableSkeleton';
import DriverTableError from '../components/driverManagement/DriverTableError';
import BlockConfirmDialog from '../components/driverManagement/BlockConfirmDialog';

export default function DriverManagement() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [availabilityFilter, setAvailabilityFilter] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [driverToBlock, setDriverToBlock] = useState<{ driver: DriverListItem; action: 'block' | 'unblock' } | null>(null);
    const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
    const [exportDrivers, { isLoading: isExporting }] = useExportDriversMutation();

    const handleExport = async () => {
        try {
            const blob = await exportDrivers({
                search: searchTerm,
                status: statusFilter,
                availability: availabilityFilter,
            }).unwrap();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `drivers-export-${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to export drivers:', error);
        }
    };

    const { data, isLoading, error, refetch } = useGetDriversQuery({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        status: statusFilter,
        availability: availabilityFilter,
    });

    console.log(data);

    const [toggleBlock, { isLoading: isToggling }] = useToggleDriverBlockMutation();

    const handleViewProfile = (driverId: string) => {
        navigate(`/drivers/${driverId}`);
    };

    const handleViewDocuments = (driverId: string) => {
        navigate(`/drivers/${driverId}/documents`);
    };

    const handleBlockClick = (driver: DriverListItem) => {
        setDriverToBlock({ driver, action: driver.blocked ? 'unblock' : 'block' });
        setIsBlockDialogOpen(true);
    };

    const handleBlockConfirm = async () => {
        if (!driverToBlock) return;
        try {
            await toggleBlock({
                id: driverToBlock.driver.id,
                blocked: !driverToBlock.driver.blocked,
            }).unwrap();
            setIsBlockDialogOpen(false);
            setDriverToBlock(null);
        } catch (error) {
            console.error('Failed to toggle block status:', error);
        }
    };

    const closeBlockDialog = () => {
        setIsBlockDialogOpen(false);
        setDriverToBlock(null);
    };

    if (isLoading) return <DriverTableSkeleton />;
    if (error) return <DriverTableError onRetry={refetch} />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">All Driver</h1>
                <p className="text-sm text-gray-600 mt-1">Manage and track all your drivers</p>
            </div>

            {/* Filters Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-75">
                        <SearchInput
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Search by driver name, ID, or phone number..."
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Status Filter */}
                        <div className="relative group w-40">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 py-2 appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            >
                                <option value="">All Status</option>
                                <option value="Verified">Verified</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
                        </div>

                        {/* Availability Filter */}
                        <div className="relative group w-40">
                            <select
                                value={availabilityFilter}
                                onChange={(e) => setAvailabilityFilter(e.target.value)}
                                className="w-full px-3 py-2 appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            >
                                <option value="">All Availability</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                                <option value="On Trip">On Trip</option>
                                <option value="Break">Break</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
                        </div>

                        {/* Export Button */}
                        <Button variant="success" onClick={handleExport}>
                            <Download size={18} className="mr-2" />
                            Export
                        </Button>
                    </div>
                </div>
            </div>

            {/* Drivers Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Driver Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Truck Assigned
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phone number
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Availability
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data?.data.map((driver) => (
                                <tr key={driver.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Avatar src={driver.avatar} name={driver.name} size="sm" />
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                                                <div className="text-xs text-gray-500">ID: {driver.driverId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {driver.truckAssigned.isAssigned ? (
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{driver.truckAssigned.model}</div>
                                                <div className="text-xs text-gray-500">
                                                    {driver.truckAssigned.type} + {driver.truckAssigned.licensePlate}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-500">Unassigned</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {driver.phoneNumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={driver.availability} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={driver.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleBlockClick(driver)}
                                                disabled={isToggling}
                                                className={`px-3 py-1 text-xs font-medium rounded-md ${driver.blocked
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    } disabled:opacity-50`}
                                            >
                                                {driver.blocked ? 'Unblock' : 'Block'}
                                            </button>
                                            <span className="text-gray-300">|</span>
                                            <button
                                                onClick={() => handleViewProfile(driver.id)}
                                                className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                                            >
                                                View
                                            </button>
                                            {driver.status === 'Pending' && (
                                                <>
                                                    <span className="text-gray-300">|</span>
                                                    <button
                                                        onClick={() => handleViewDocuments(driver.id)}
                                                        className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
                                                    >
                                                        Documents
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {data && data.pagination.total > 0 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage >= Math.ceil(data.pagination.total / data.pagination.limit)}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{(currentPage - 1) * data.pagination.limit + 1}</span>{' '}
                                    to{' '}
                                    <span className="font-medium">
                                        {Math.min(currentPage * data.pagination.limit, data.pagination.total)}
                                    </span>{' '}
                                    of <span className="font-medium">{data.pagination.total}</span> drivers
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage >= Math.ceil(data.pagination.total / data.pagination.limit)}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Block Confirmation Dialog */}
            <BlockConfirmDialog
                isOpen={isBlockDialogOpen}
                driverName={driverToBlock?.driver.name || ''}
                currentBlocked={driverToBlock?.driver.blocked || false}
                onConfirm={handleBlockConfirm}
                onCancel={closeBlockDialog}
            />
        </div>
    );
}