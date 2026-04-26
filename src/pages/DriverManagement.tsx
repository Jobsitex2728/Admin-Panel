import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Search, ChevronRight, Clock } from 'lucide-react'
import { useGetDriversQuery } from '@/store/api/driversApi'
import type { DriverListItem } from '@/types/driver'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Pagination } from '@/components/shared/Pagination'
import { PageHeader } from '@/components/shared/PageHeader'
import { formatDate, getInitials } from '@/lib/utils'
import type { DriverStatus } from '@/types/driver'

export default function DriversPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'all' | 'pending'>('all')

  const statusFilter: DriverStatus | undefined = tab === 'pending' ? 'PENDING' : undefined

  const { data, isLoading } = useGetDriversQuery({ page, limit: 10, status: statusFilter })

  const filtered = data?.drivers.filter((d: DriverListItem) =>
    !search ||
    d.user.fullName.toLowerCase().includes(search.toLowerCase()) ||
    d.user.email.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  return (
    <div>
      <PageHeader title="Drivers" description="Manage driver profiles and approvals" />

      <Tabs value={tab} onValueChange={v => { setTab(v as typeof tab); setPage(1) }} className="mb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="all">All Drivers</TabsTrigger>
            <TabsTrigger value="pending">
              Pending Approval
              {tab !== 'pending' && data && (
                <span className="ml-1.5 rounded-full bg-amber-100 text-amber-700 text-xs px-1.5 py-0.5">
                  {data.total}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search drivers…" className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <TabsContent value="all">
          <DriversTable drivers={filtered} isLoading={isLoading} onRowClick={id => navigate(`/drivers/${id}`)} />
        </TabsContent>
        <TabsContent value="pending">
          <DriversTable drivers={filtered} isLoading={isLoading} onRowClick={id => navigate(`/drivers/${id}`)} showPendingBadge />
        </TabsContent>
      </Tabs>

      {data && <Pagination page={page} total={data.total} limit={10} onPageChange={setPage} />}
    </div>
  )
}

function DriversTable({
  drivers, isLoading, onRowClick, showPendingBadge,
}: {
  drivers: DriverListItem[]
  isLoading: boolean
  onRowClick: (id: string) => void
  showPendingBadge?: boolean
}) {
  return (
    <Card>
      <CardContent className="p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Driver</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Truck Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Profile</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Joined</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}><td className="px-4 py-3" colSpan={6}><Skeleton className="h-10 w-full" /></td></tr>
                ))
              : drivers.map(driver => (
                  <tr
                    key={driver.id}
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                    onClick={() => onRowClick(driver.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={driver.user.avatar} />
                            <AvatarFallback>{getInitials(driver.user.fullName)}</AvatarFallback>
                          </Avatar>
                          {driver.isAvailable && (
                            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{driver.user.fullName}</p>
                          <p className="text-xs text-slate-400">{driver.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm text-slate-600">{driver.truckType?.name ?? '—'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <StatusBadge status={driver.driverStatus} type="driver" />
                        {showPendingBadge && driver.driverStatus === 'PENDING' && (
                          <Clock className="h-3.5 w-3.5 text-amber-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-xs font-medium ${driver.isProfileComplete ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {driver.isProfileComplete ? 'Complete' : 'Incomplete'}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-sm text-slate-500">{formatDate(driver.createdAt)}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ChevronRight className="h-4 w-4 text-slate-400 ml-auto" />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {!isLoading && drivers.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm">No drivers found.</div>
        )}
      </CardContent>
    </Card>
  )
}
