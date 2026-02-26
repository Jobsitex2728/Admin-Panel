import { LayoutGrid } from "lucide-react";

const activities = [
  {
    id: 1,
    type: 'delivered',
    load: '#8291',
    description: 'Delivered',
    driver: 'Mike Ross',
    location: 'Chicago, IL',
    time: '2m ago'
  },
  {
    id: 2,
    type: 'delay',
    title: 'Driver Delayed',
    load: '#8300',
    description: 'Traffic on I-95',
    time: '12m ago'
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment Processed',
    invoice: 'INV-2023',
    time: '15m ago'
  },
  {
    id: 4,
    type: 'delivered',
    load: '#8291',
    description: 'Delivered',
    driver: 'Mike Ross',
    location: 'Chicago, IL',
    time: '9m ago'
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-center gap-3 border-b border-gray-200 pb-3">
            <div className={`w-8 h-8 mt-2 flex items-center justify-center rounded-full ${
              activity.type === 'delivered' ? 'bg-green-200' :
              activity.type === 'delay' ? 'bg-yellow-200' : 'bg-blue-200'
            }`}>
                <LayoutGrid className={`w-5 h-5 ${
              activity.type === 'delivered' ? ' text-green-500  fill-green-500' :
              activity.type === 'delay' ? 'text-yellow-500  fill-yellow-500' : 'text-blue-500  fill-blue-500'
            }`} />
            </div>
            
            <div className="flex-1">
              {activity.type === 'delivered' && (
                <>
                  <p className="text-sm">
                    <span className="font-medium">Load {activity.load}</span> {activity.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    Driver: {activity.driver} • {activity.location}
                  </p>
                </>
              )}
              
              {activity.type === 'delay' && (
                <>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-gray-500">
                    Load {activity.load} • {activity.description}
                  </p>
                </>
              )}
              
              {activity.type === 'payment' && (
                <>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.invoice}</p>
                </>
              )}
              
              
            </div>

            <p className="text-xs text-gray-400 ">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}