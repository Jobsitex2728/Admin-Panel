import { ShieldAlert } from "lucide-react";

interface BlockConfirmDialogProps {
    isOpen: boolean;
    driverName: string;
    currentBlocked: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function BlockConfirmDialog({ 
    isOpen, 
    driverName, 
    currentBlocked, 
    onConfirm, 
    onCancel 
}: BlockConfirmDialogProps) {
    if (!isOpen) return null;

    const title = currentBlocked ? 'Unblock Driver' : 'Block Driver';
    const message = currentBlocked
        ? `Are you sure you want to unblock ${driverName}? This will allow them to accept new jobs.`
        : `Are you sure you want to block ${driverName}? This will prevent them from accepting new jobs.`;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <ShieldAlert className="text-red-600" />
                    </div>

                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
                        <p className="text-sm text-gray-500">{message}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            currentBlocked
                                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                                : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                        }`}
                    >
                        {currentBlocked ? 'Yes, Unblock' : 'Yes, Block'}
                    </button>
                </div>
            </div>
        </div>
    );
}