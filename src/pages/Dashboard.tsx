import RecentActivity from '../components/dashboard/RecentActivity';
import QuickActions from '../components/dashboard/QuickActions';
import StatsCard from '../components/dashboard/StatsCards';
import { UsersRound } from 'lucide-react';
import UserGrowthChart from '../components/dashboard/UserGrowthChart';

export default function Dashboard() {

    const userGrowthData = {
        totalUsers: 1082,
        newJoiners: 100,
        growth: 15,
        lastMonthSummary: 9488,
        chartData: [
            { month: 'Jan', new: 400, old: 600 },
            { month: 'Feb', new: 600, old: 620 },
            { month: 'Mar', new: 500, old: 650 },
            { month: 'Apr', new: 550, old: 680 },
            { month: 'May', new: 600, old: 700 },
            { month: 'Jun', new: 650, old: 720 },
            { month: 'Jul', new: 700, old: 750 },
            { month: 'Aug', new: 750, old: 780 },
            { month: 'Sep', new: 800, old: 800 },
            { month: 'Oct', new: 850, old: 820 },
            { month: 'Nov', new: 900, old: 850 },
            { month: 'Dec', new: 950, old: 880 }
        ]
    };

    return (
        <main className="flex-1 ml-64 p-8 bg-gray-50">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
                <p className="text-gray-500 mt-1">Dashboard</p>
            </div>

            {/* First Row Stats */}
            <div className="grid grid-cols-4 gap-6 mb-6">
                <StatsCard label="Active Jobs" value="82" trend="15" trendType="YoY" Icon={UsersRound} />
                <StatsCard label="Online Drivers" value="25/50" trend="15" trendType="MoM" Icon={UsersRound} />
                <StatsCard label="Total Jobs" value="2,488" trend="15" trendType="YoY" Icon={UsersRound} />
                <StatsCard label="Jobs Management" trend="15" trendType="YoY" Icon={UsersRound} />
            </div>

            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="col-span-3">
                    <UserGrowthChart data={userGrowthData} />
                </div>
                <div className='flex flex-col justify-between'>
                    <StatsCard label="Active Jobs" value="82" trend="15" trendType="YoY" Icon={UsersRound} />
                    <StatsCard label="Active Jobs" value="82" trend="15" trendType="YoY" Icon={UsersRound} />
                </div>
            </div>




            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="col-span-3">
                    <RecentActivity />
                </div>
                <div className=''>
                    <QuickActions />
                </div>
            </div>

        </main>
    );
}