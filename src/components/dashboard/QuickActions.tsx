import { Package } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg py-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4 px-6">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3 border-t border-gray-200 pt-4 px-6">
        {[1, 2, 3, 4].map((i) => (
          <button
            key={i}
            className="flex flex-col items-center justify-center gap-2 p-3 h-28 border border-green-500 rounded-xl text-green-500 hover:bg-green-500 hover:text-white transition-colors"
          >
            <Package size={25} />
            <span className="text-xs font-medium">New Load</span>
          </button>
        ))}
      </div>
    </div>
  );
}