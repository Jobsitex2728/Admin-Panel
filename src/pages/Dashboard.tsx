import RecentActivity from '../components/dashboard/RecentActivity';
import QuickActions from '../components/dashboard/QuickActions';
import StatsCard from '../components/dashboard/StatsCards';
import { BriefcaseBusiness, CircleDollarSign, UserRoundCheck, UsersRound } from 'lucide-react';
import UserGrowthChart from '../components/dashboard/UserGrowthChart';
import { useGetDashboardQuery } from '../redux/services/dashboardApi';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton';
import DashboardError from '../components/dashboard/DashboardErrorState';


export default function Dashboard() {

    const { data, error, isLoading } = useGetDashboardQuery('');

    if (isLoading) {
        return (
            <DashboardSkeleton />
        )
    }

    if (error) {
        return (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <DashboardError errorMessage={(error as any).data as string || 'An error occurred'} />
        )
    }

    return (
        <main className="flex-1 p-8 bg-gray-50">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
                <p className="text-gray-500 mt-1">Dashboard</p>
            </div>

            {/* First Row Stats */}
            <div className="grid grid-cols-4 gap-6 mb-6">
                <StatsCard label="Active Jobs" value={data?.stats.activeJobs.value || 0} trend={data?.stats.activeJobs.trend || 0} trendType={data?.stats.activeJobs.trendType || 'YoY'} Icon={UsersRound} />
                <StatsCard label="Online Drivers" value={data?.stats.onlineDrivers.value || 0} trend={data?.stats.onlineDrivers.trend || 0} trendType={data?.stats.onlineDrivers.trendType || 'YoY'} Icon={UserRoundCheck} />
                <StatsCard label="Total Jobs" value={data?.stats.totalJobs.value || 0} trend={data?.stats.totalJobs.trend || 0} trendType={data?.stats.totalJobs.trendType || 'YoY'} Icon={BriefcaseBusiness} />
                <StatsCard label="Total Revenue" value={data?.stats.totalRevenue.value || 0} trend={data?.stats.totalRevenue.value || 0} trendType={data?.stats.totalRevenue.trendType || 'YoY'} Icon={CircleDollarSign} />
            </div>

            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="col-span-3">
                    <UserGrowthChart data={data!.userGrowth!} />
                </div>
                <div className='flex flex-col justify-between'>
                    <StatsCard label="Total Users" value={data?.userGrowth.total || 0} trend={data?.stats.totalJobs.trend || 0} trendType={data?.stats.totalJobs.trendType || 'MoM'} Icon={BriefcaseBusiness} />
                    <StatsCard label="Total Revenue" value={data?.stats.totalRevenue.value || 0} trend={data?.stats.totalRevenue.value || 0} trendType={data?.stats.totalRevenue.trendType || 'MoM'} Icon={CircleDollarSign} />
                </div>
            </div>




            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="col-span-3">
                    <RecentActivity activities={data?.recentActivity || []} />
                </div>
                <div className=''>
                    <QuickActions />
                </div>
            </div>

        </main>
    );
}