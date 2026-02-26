import { LayoutDashboard, Truck, Users, CreditCard, Star, Settings, LogOut } from 'lucide-react';
import { useAppSelector } from '../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Truck, label: 'Jobs Management', path: '/jobs' },
    { icon: Users, label: 'Driver Management', path: '/drivers' },
    { icon: Users, label: 'Customer/Shipper', path: '/customers' },
    { icon: CreditCard, label: 'Payments & Invoicing', path: '/payments' },
    { icon: Star, label: 'Review Moderation', path: '/reviews' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
    const collapsed = useAppSelector((state) => state.dashboard.sidebarCollapsed);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside className={`bg-white border-r border-gray-200 h-screen fixed left-0 top-0 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'
            }`}>
            <div className="p-6">
                <h1 className={`font-bold text-xl text-primary-600 ${collapsed ? 'hidden' : 'block'}`}>
                    JobSiteX
                </h1>
                {collapsed && <h1 className="font-bold text-xl text-primary-600 text-center">JX</h1>}
            </div>

            <nav className="mt-6">
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path ||
                        (item.path === '/' && location.pathname === '/dashboard');

                    return (
                        <button
                            key={index}
                            onClick={() => navigate(item.path)}
                            className={`flex w-full items-center px-6 py-3 text-gray-700 hover:bg-green-200 hover:text-black transition-colors ${isActive ? 'bg-green-500 text-white border-r-4 border-gray-700' : ''
                                }`}
                        >
                            <item.icon size={20} />
                            <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>{item.label}</span>
                        </button>
                    )
                })}
            </nav>

            <div className="absolute bottom-0 w-full p-6 border-t border-gray-200">
                <button className="flex items-center text-gray-700 hover:text-red-600 transition-colors">
                    <LogOut size={20} />
                    <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Logout</span>
                </button>
            </div>
        </aside>
    );
}