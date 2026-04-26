import { useState } from 'react'
import { Search, MapPin, Eye } from 'lucide-react'
import { useGetJobsQuery, useGetJobQuery } from '@/store/api/jobsApi'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Pagination } from '@/components/shared/Pagination'
import { PageHeader } from '@/components/shared/PageHeader'
import { formatCurrency, formatDate, formatDateTime, getInitials } from '@/lib/utils'
import type { Job, JobStatus } from '@/types/job'

const JOB_STATUSES: JobStatus[] = ['PENDING', 'BROADCAST', 'BOOKED', 'ON_WAY', 'ARRIVED', 'LOADED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED']

function JobDetailPanel({ jobId, onClose }: { jobId: string; onClose: () => void }) {
  const { data: job, isLoading } = useGetJobQuery(jobId)

  return (
    <Dialog open onOpenChange={o => { if (!o) onClose() }}>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-4 overflow-y-auto max-h-[65vh]">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : job ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">{job.id}</span>
                <StatusBadge status={job.status} type="job" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-400 mb-1">Customer</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={job.customer.user.avatar} />
                      <AvatarFallback className="text-[10px]">{getInitials(job.customer.user.fullName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{job.customer.user.fullName}</p>
                      <p className="text-xs text-slate-400">{job.customer.user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-400 mb-1">Driver</p>
                  {job.driver ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={job.driver.user.avatar} />
                        <AvatarFallback className="text-[10px]">{getInitials(job.driver.user.fullName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{job.driver.user.fullName}</p>
                        <p className="text-xs text-slate-400">{job.driver.user.email}</p>
                      </div>
                    </div>
                  ) : <p className="text-sm text-slate-400">Not assigned</p>}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <MapPin className="h-3 w-3 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Pickup</p>
                    <p className="text-sm text-slate-900">{job.pickupAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <MapPin className="h-3 w-3 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Dropoff</p>
                    <p className="text-sm text-slate-900">{job.dropoffAddress}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Truck Type', value: job.truckType.name },
                  { label: 'Distance', value: job.distanceKm ? `${job.distanceKm.toFixed(1)} km` : '—' },
                  { label: 'Scheduled', value: formatDateTime(job.scheduledAt) },
                  { label: 'Est. Fare', value: job.estimatedFare ? formatCurrency(job.estimatedFare) : '—' },
                  { label: 'Final Fare', value: job.finalFare ? formatCurrency(job.finalFare) : '—' },
                  { label: 'Created', value: formatDate(job.createdAt) },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-sm font-medium text-slate-900 mt-0.5">{value}</p>
                  </div>
                ))}
              </div>

              {job.payment && (
                <div className="rounded-lg border border-slate-200 p-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Payment</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Amount</span>
                    <span className="font-medium">{formatCurrency(job.payment.amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-600">Platform fee</span>
                    <span className="font-medium">{formatCurrency(job.payment.platformFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-600">Driver payout</span>
                    <span className="font-medium text-emerald-600">{formatCurrency(job.payment.driverPayout)}</span>
                  </div>
                </div>
              )}

              {job.review && (
                <div className="rounded-lg border border-slate-200 p-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Review</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < job.review!.rating ? 'text-amber-400' : 'text-slate-200'}>★</span>
                    ))}
                    <span className="ml-1 text-sm text-slate-600">{job.review.rating}/5</span>
                  </div>
                  {job.review.comment && <p className="text-sm text-slate-600 mt-1">"{job.review.comment}"</p>}
                </div>
              )}
            </>
          ) : null}
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

export default function JobsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<JobStatus | ''>('')
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)

  const { data, isLoading } = useGetJobsQuery({ page, limit: 10, status: status || undefined })

  const filtered = data?.jobs.filter((j: Job) =>
    !search ||
    j.pickupAddress.toLowerCase().includes(search.toLowerCase()) ||
    j.dropoffAddress.toLowerCase().includes(search.toLowerCase()) ||
    j.customer.user.fullName.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  return (
    <div>
      <PageHeader title="Jobs" description="Monitor all platform jobs" />

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search by customer or address…" className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={status || 'all'} onValueChange={v => { setStatus(v === 'all' ? '' : v as JobStatus); setPage(1) }}>
          <SelectTrigger className="w-44"><SelectValue placeholder="All statuses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {JOB_STATUSES.map(s => <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Route</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Fare</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i}><td className="px-4 py-3" colSpan={6}><Skeleton className="h-10 w-full" /></td></tr>
                  ))
                : filtered.map((job: Job) => (
                    <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={job.customer.user.avatar} />
                            <AvatarFallback className="text-[10px]">{getInitials(job.customer.user.fullName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{job.customer.user.fullName}</p>
                            <p className="text-xs text-slate-400">{job.truckType.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell max-w-xs">
                        <p className="text-xs text-slate-500 truncate">{job.pickupAddress}</p>
                        <p className="text-xs text-slate-400 truncate">→ {job.dropoffAddress}</p>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={job.status} type="job" />
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm font-medium text-slate-900">
                          {job.finalFare ? formatCurrency(job.finalFare) : job.estimatedFare ? formatCurrency(job.estimatedFare) : '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm text-slate-500">{formatDate(job.createdAt)}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedJobId(job.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {!isLoading && filtered.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm">No jobs found.</div>
          )}
          {data && <Pagination page={page} total={data.total} limit={10} onPageChange={setPage} />}
        </CardContent>
      </Card>

      {selectedJobId && <JobDetailPanel jobId={selectedJobId} onClose={() => setSelectedJobId(null)} />}
    </div>
  )
}
