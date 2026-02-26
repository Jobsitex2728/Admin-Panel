import { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface ChartData {
    month: string;
    new: number;
    old: number;
}

interface UserGrowthSectionProps {
    data: {
        totalUsers: number;
        newJoiners: number;
        growth: number;
        chartData: ChartData[];
        lastMonthSummary: number;
    };
}

export default function UserGrowthSection({ data }: UserGrowthSectionProps) {
    const [timeFilter, setTimeFilter] = useState('Monthly');
    const [showNew, setShowNew] = useState(true);
    const [showOld, setShowOld] = useState(true);

    return (
        <div className="bg-white rounded-lg shadow-sm border flex gap-10 border-gray-200 p-6">
            {/* Header */}
            <div className='w-max'>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
                    <p className="text-sm text-gray-500 mt-1 text-nowrap">Overview of Latest Month</p>
                </div>

                {/* Stats Grid */}
                <div className="space-y-6 mb-6">
                    {/* User Growth */}
                    <div>
                        <p className="text-sm text-gray-500">User Growth</p>
                        <p className="text-2xl font-bold text-green-600">+{data.growth}%</p>
                    </div>

                    {/* Last Month Summary */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-500">Last Month Summary</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {data.lastMonthSummary.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>


            <div className='w-full'>
                {/* Filters */}
                <div className="flex items-center justify-between mb-6">
                    {/* Time Filters */}
                    <div className="flex gap-4 ml-16">
                        {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setTimeFilter(filter)}
                                className={`text-sm ${timeFilter === filter
                                    ? 'text-blue-600 font-medium'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* User Type Filters with colored dots */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowNew(!showNew)}
                            className="flex items-center gap-2 text-sm"
                        >
                            <span className={`w-2 h-2 rounded-full ${showNew ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                            <span className={showNew ? 'text-blue-600 font-medium' : 'text-gray-400'}>New</span>
                        </button>

                        <button
                            onClick={() => setShowOld(!showOld)}
                            className="flex items-center gap-2 text-sm"
                        >
                            <span className={`w-2 h-2 rounded-full ${showOld ? 'bg-green-600' : 'bg-gray-300'}`}></span>
                            <span className={showOld ? 'text-green-600 font-medium' : 'text-gray-400'}>Old</span>
                        </button>
                    </div>
                </div>

                {/* Chart with Gradients */}
                <div className="h-54">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data.chartData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            {/* Gradients */}
                            <defs>
                                {/* Blue gradient for New users */}
                                <linearGradient id="newGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>

                                {/* Green gradient for Old users */}
                                <linearGradient id="oldGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#E5E7EB"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                dx={-10}
                                ticks={[0, 200, 400, 600, 800, 1000]}
                            />
                            <Tooltip />

                            {/* New Users Area - Blue with gradient */}
                            {showNew && (
                                <Area
                                    type="monotone"
                                    dataKey="new"
                                    name="New Users"
                                    stroke="#3B82F6"
                                    strokeWidth={2}
                                    fill="url(#newGradient)"

                                />
                            )}

                            {/* Old Users Area - Green with gradient */}
                            {showOld && (
                                <Area
                                    type="monotone"
                                    dataKey="old"
                                    name="Old Users"
                                    stroke="#10B981"
                                    strokeWidth={2}
                                    fill="url(#oldGradient)"
                                />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}