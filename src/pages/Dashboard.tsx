import { useGetDashboardStatsQuery } from '@/store/api/dashboardApi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency } from '@/lib/utils'
import {
  Users, Truck, Briefcase, DollarSign,
  Clock, FileCheck, AlertCircle, TrendingUp,
  UserCheck, Ban, CheckCircle, XCircle,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  iconBg: string
  iconColor: string
  sub?: string
}

function StatCard({ title, value, icon: Icon, iconBg, iconColor, sub }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-500 font-medium">{title}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{value}</p>
            {sub && <p className="text-xs text-slate-400 mt-1 truncate">{sub}</p>}
          </div>
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ml-3 ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}><CardContent className="p-6"><Skeleton className="h-20 w-full" /></CardContent></Card>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const { data: stats, isLoading, isError } = useGetDashboardStatsQuery()

  return (
    <div className="space-y-6">
      {isLoading ? (
        <StatsSkeleton />
      ) : isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 flex items-center gap-3 text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">Failed to load dashboard stats. Make sure the backend is running.</p>
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value={stats.users.total} icon={Users} iconBg="bg-blue-50" iconColor="text-blue-600" sub={`+${stats.users.newThisMonth} joined this month`} />
          <StatCard title="Approved Drivers" value={stats.users.approvedDrivers} icon={Truck} iconBg="bg-emerald-50" iconColor="text-emerald-600" sub={`${stats.users.drivers} total drivers`} />
          <StatCard title="Active Jobs" value={stats.jobs.active} icon={Briefcase} iconBg="bg-purple-50" iconColor="text-purple-600" sub={`${stats.jobs.total} total jobs`} />
          <StatCard title="Revenue This Month" value={formatCurrency(stats.revenue.thisMonth)} icon={DollarSign} iconBg="bg-emerald-50" iconColor="text-emerald-600" sub={`${formatCurrency(stats.revenue.total)} all time`} />
          <StatCard title="Pending Approvals" value={stats.approvals.pendingDrivers} icon={Clock} iconBg="bg-amber-50" iconColor="text-amber-600" sub="Driver profiles awaiting review" />
          <StatCard title="Pending Documents" value={stats.approvals.pendingDocuments} icon={FileCheck} iconBg="bg-cyan-50" iconColor="text-cyan-600" sub="Documents to review" />
          <StatCard title="Blocked Users" value={stats.users.blocked} icon={Ban} iconBg="bg-red-50" iconColor="text-red-600" sub="Currently suspended" />
          <StatCard title="Completed Jobs" value={stats.jobs.completed} icon={CheckCircle} iconBg="bg-teal-50" iconColor="text-teal-600" sub={`${stats.jobs.cancelled} cancelled`} />
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <p className="text-xs text-slate-400 mt-0.5">Platform fee collected — last 6 months</p>
              </div>
              {stats && (
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900 tabular-nums">{formatCurrency(stats.revenue.thisMonth)}</p>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium justify-end">
                    <TrendingUp className="h-3 w-3" />
                    <span>This month</span>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-56 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={224}>
                <BarChart data={stats?.revenue.monthly ?? []} barSize={28} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(1)}k`} width={48} />
                  <Tooltip
                    formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f0fdf4' }}
                  />
                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Job breakdown */}
        <Card>
          <CardHeader><CardTitle>Job Breakdown</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
            ) : stats ? (
              <div className="space-y-3">
                {[
                  { label: 'Active', value: stats.jobs.active, bar: 'bg-purple-500', icon: Briefcase, pct: stats.jobs.total ? Math.round((stats.jobs.active / stats.jobs.total) * 100) : 0 },
                  { label: 'Completed', value: stats.jobs.completed, bar: 'bg-emerald-500', icon: CheckCircle, pct: stats.jobs.total ? Math.round((stats.jobs.completed / stats.jobs.total) * 100) : 0 },
                  { label: 'Cancelled', value: stats.jobs.cancelled, bar: 'bg-red-400', icon: XCircle, pct: stats.jobs.total ? Math.round((stats.jobs.cancelled / stats.jobs.total) * 100) : 0 },
                  { label: 'Approved Drivers', value: stats.users.approvedDrivers, bar: 'bg-emerald-400', icon: UserCheck, pct: stats.users.drivers ? Math.round((stats.users.approvedDrivers / stats.users.drivers) * 100) : 0 },
                ].map(({ label, value, bar, icon: Icon, pct }) => (
                  <div key={label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Icon className="h-3.5 w-3.5 text-slate-400" />
                        {label}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{value}</span>
                        <span className="text-xs text-slate-400 w-8 text-right">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100">
                      <div className={`h-1.5 rounded-full ${bar} transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}

                <div className="pt-3 mt-3 border-t border-slate-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Total jobs</span>
                    <span className="font-bold text-slate-900">{stats.jobs.total}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-500">Total users</span>
                    <span className="font-bold text-slate-900">{stats.users.total}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
