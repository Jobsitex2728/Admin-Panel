interface StatusBadgeProps {
  status: string;
  type?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'pending';
}

export default function StatusBadge({ status, type = 'default' }: StatusBadgeProps) {
  const getTypeFromStatus = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('verified') || statusLower.includes('completed') || statusLower.includes('approved') || statusLower.includes('delivered')) {
      return 'success';
    }
    if (statusLower.includes('pending') || statusLower.includes('in progress')) {
      return 'warning';
    }
    if (statusLower.includes('rejected') || statusLower.includes('canceled') || statusLower.includes('failed')) {
      return 'error';
    }
    if (statusLower.includes('online') || statusLower.includes('in transit')) {
      return 'info';
    }
    if (statusLower.includes('offline') || statusLower.includes('paused')) {
      return 'default';
    }
    return 'default';
  };

  const resolvedType = type === 'default' ? getTypeFromStatus(status) : type;
  
  const styles = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    pending: 'bg-purple-100 text-purple-800',
    default: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${styles[resolvedType as keyof typeof styles] || styles.default}`}>
      {status}
    </span>
  );
}