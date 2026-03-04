import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Clock, History } from 'lucide-react';
import { useGetDriverDocumentsQuery, useUpdateDocumentStatusMutation } from '../redux/services/driverApi';
import StatusBadge from '../components/shared/StatusBadge';
import DocumentsSkeleton from '../components/driverManagement/DocumentsSkeleton';
import DocumentsError from '../components/driverManagement/DocumentsError';


export default function DriverDocuments() {
    const { driverId } = useParams<{ driverId: string }>();
    const navigate = useNavigate();

    const { data: documents, isLoading, error, refetch } = useGetDriverDocumentsQuery(driverId || '');
    const [updateStatus, { isLoading: isUpdating }] = useUpdateDocumentStatusMutation();

    if (isLoading) return <DocumentsSkeleton />;
    if (error || !documents) return <DocumentsError onRetry={refetch} />;

    const handleApprove = async (documentId: string) => {
        try {
            await updateStatus({
                driverId: driverId!,
                documentId,
                status: 'Approved',
            }).unwrap();
        } catch (error) {
            console.error('Failed to approve document:', error);
        }
    };

    const handleReject = async (documentId: string) => {
        try {
            await updateStatus({
                driverId: driverId!,
                documentId,
                status: 'Rejected',
                comments: 'Document does not meet requirements',
            }).unwrap();
        } catch (error) {
            console.error('Failed to reject document:', error);
        }
    };

    const handleRequestReupload = async (documentId: string) => {
        try {
            await updateStatus({
                driverId: driverId!,
                documentId,
                status: 'Request Re-upload',
                comments: 'Please upload a clearer image',
            }).unwrap();
        } catch (error) {
            console.error('Failed to request re-upload:', error);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Approved':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'Rejected':
                return <XCircle className="w-5 h-5 text-red-500" />;
            case 'Pending':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'Request Re-upload':
                return <AlertCircle className="w-5 h-5 text-orange-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6 flex items-center gap-4">
                <button
                    onClick={() => navigate(`/drivers/${driverId}`)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All Driver / Driver Profile / View Documents</h1>
                    <p className="text-sm text-gray-600 mt-1">Review and manage driver documents</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Left Column - Documents List */}
                <div className="col-span-2 space-y-6">
                    {documents.documents.map((doc) => (
                        <div key={doc.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{doc.type}</h3>
                                    <p className="text-sm text-gray-500">Document #{doc.documentNumber}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {getStatusIcon(doc.status)}
                                    <StatusBadge status={doc.status} />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <p className="text-xs text-gray-500">LICENSE NUMBER</p>
                                    <p className="text-sm font-medium">{doc.documentNumber}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">EXPIRATION DATE</p>
                                    <p className="text-sm font-medium">{doc.expirationDate}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">STATE OF ISSUE</p>
                                    <p className="text-sm font-medium">{doc.stateOfIssue || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Document Preview */}
                            <div className="mb-4">
                                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                    {doc.imageUrl ? (
                                        <img
                                            src={doc.imageUrl}
                                            alt={doc.type}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    ) : (
                                        <p className="text-gray-400">No preview available</p>
                                    )}
                                </div>
                            </div>

                            {/* Admin Controls */}
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Admin Controls</h4>
                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={doc.status === 'Approved'}
                                            onChange={() => handleApprove(doc.id)}
                                            className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />
                                        <span className="text-sm text-gray-700">Approve Document</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={doc.status === 'Request Re-upload'}
                                            onChange={() => handleRequestReupload(doc.id)}
                                            className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        />
                                        <span className="text-sm text-gray-700">Request Re-upload</span>
                                    </label>
                                    <button className="p-2 text-gray-400 hover:text-gray-600">
                                        <History className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Document History */}
                            {doc.history.length > 0 && (
                                <div className="mt-4 pt-4 border-t">
                                    <button
                                        onClick={() => {/* Toggle history view */ }}
                                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                    >
                                        <History className="w-4 h-4" />
                                        View history ({doc.history.length} attempts)
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>


                {/* Right Column - Verification Steps */}
                < div className="space-y-6" >
                    {/* Verification Steps */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Steps</h3>
                        <div className="space-y-4">
                            {documents.verificationSteps.map((step) => (
                                <div key={step.id} className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        {step.status === 'Completed' && (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        )}
                                        {step.status === 'Pending' && (
                                            <Clock className="w-5 h-5 text-yellow-500" />
                                        )}
                                        {step.status === 'Action Required' && (
                                            <AlertCircle className="w-5 h-5 text-orange-500" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-gray-900">{step.name}</h4>
                                        {step.date && (
                                            <p className="text-xs text-gray-500">Passed on {step.date}</p>
                                        )}
                                        {step.details && (
                                            <p className="text-xs text-gray-600 mt-1">{step.details}</p>
                                        )}
                                        {step.assignedTo && (
                                            <p className="text-xs text-gray-400 mt-1">Assigned to: {step.assignedTo}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div />
                </div>
            </div>
        </div>

    );
}
