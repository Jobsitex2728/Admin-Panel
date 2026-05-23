import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { ArrowLeft, ExternalLink, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useGetDriverQuery, useApproveDriverMutation } from '@/store/api/driversApi'
import { useGetTruckTypesQuery } from '@/store/api/truckTypesApi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { formatCurrency, formatDate, getInitials } from '@/lib/utils'
import type { ApproveDriverRequest, Document, DocumentType } from '@/types/driver'
import { toast } from 'sonner'

const DOC_LABELS: Record<DocumentType, string> = {
  CDL_LICENSE: 'CDL License',
  INSURANCE: 'Insurance',
  DOT_NUMBER: 'DOT Certificate',
  TRUCK_PHOTO: 'Truck Photo',
}

export default function DriverDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: driver, isLoading, isError } = useGetDriverQuery(id!)
  const { data: truckTypes } = useGetTruckTypesQuery()
  const [approveDriver, { isLoading: approving }] = useApproveDriverMutation()

  const [form, setForm] = useState<Omit<ApproveDriverRequest, 'decision' | 'rejectionReason'>>({})
  const [rejectionReason, setRejectionReason] = useState('')
  const [decision, setDecision] = useState<'APPROVED' | 'REJECTED'>('APPROVED')

  useEffect(() => {
    if (driver) {
      setForm({
        truckTypeId: driver.truckTypeId ?? undefined,
        numberPlate: driver.numberPlate ?? undefined,
        truckModel: driver.truckModel ?? undefined,
        truckWeight: driver.truckWeight ?? undefined,
        trailerType: driver.trailerType ?? undefined,
        hourlyRate: driver.hourlyRate ?? undefined,
      })
    }
  }, [driver])

  const setField = (key: keyof typeof form, value: string | number) =>
    setForm(f => ({ ...f, [key]: value }))

  const handleApprove = async () => {
    if (!id) return
    try {
      await approveDriver({ id, body: { decision, rejectionReason: decision === 'REJECTED' ? rejectionReason : undefined, ...form } }).unwrap()
      toast.success(`Driver ${decision.toLowerCase()} successfully`)
      navigate('/drivers')
    } catch { toast.error('Failed to update driver status') }
  }

  if (isLoading) return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  )

  if (isError || !driver) return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 flex items-center gap-3 text-red-700">
      <AlertCircle className="h-5 w-5" />
      <p className="text-sm">Failed to load driver profile.</p>
    </div>
  )

  return (
    <div className="space-y-6 max-w-4xl">
      <Button variant="ghost" className="gap-2 -ml-2" onClick={() => navigate('/drivers')}>
        <ArrowLeft className="h-4 w-4" /> Back to Drivers
      </Button>

      {/* Driver header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={driver.user.avatar} />
              <AvatarFallback className="text-lg">{getInitials(driver.user.fullName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold text-slate-900">{driver.user.fullName}</h2>
                <StatusBadge status={driver.driverStatus} type="driver" />
                {driver.isAvailable && <StatusBadge status="ACTIVE" type="user" />}
              </div>
              <p className="text-slate-500 text-sm mt-1">{driver.user.email}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
                <span>Joined {formatDate(driver.user.createdAt)}</span>
                <span>{driver._count.jobs} jobs</span>
                <span>Balance: {formatCurrency(driver.currentBalance)}</span>
                <span>Total earned: {formatCurrency(driver.totalEarnings)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          {driver.driverStatus === 'PENDING' && (
            <p className="text-xs text-slate-400 mt-0.5">Review each document below, then approve or reject the driver using the form below.</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {driver.documents.map((doc: Document) => (
              <div key={doc.id} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                  <FileText className="h-4 w-4 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{DOC_LABELS[doc.type]}</p>
                  <StatusBadge status={doc.status} type="document" />
                </div>
                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            ))}
            {driver.documents.length === 0 && (
              <p className="text-sm text-slate-400 col-span-2">No documents uploaded yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Approval form */}
      {driver.driverStatus === 'PENDING' && (
        <Card>
          <CardHeader><CardTitle>Review & Approve Driver</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-slate-500">
              Fill in the details from reviewing the driver's documents, then approve or reject.
              All pending documents will be automatically updated to match your decision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Truck Type</Label>
                <Select value={form.truckTypeId ?? ''} onValueChange={v => setField('truckTypeId', v)}>
                  <SelectTrigger><SelectValue placeholder="Select truck type" /></SelectTrigger>
                  <SelectContent>
                    {truckTypes?.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Number Plate</Label>
                <Input placeholder="e.g. ABC-1234" value={form.numberPlate ?? ''} onChange={e => setField('numberPlate', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Truck Model</Label>
                <Input placeholder="e.g. Freightliner Cascadia" value={form.truckModel ?? ''} onChange={e => setField('truckModel', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Truck Weight (lbs)</Label>
                <Input type="number" placeholder="e.g. 30000" value={form.truckWeight ?? ''} onChange={e => setField('truckWeight', Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <Label>Trailer Type</Label>
                <Input placeholder="e.g. Flatbed" value={form.trailerType ?? ''} onChange={e => setField('trailerType', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Hourly Rate ($)</Label>
                <Input type="number" placeholder="e.g. 75" value={form.hourlyRate ?? ''} onChange={e => setField('hourlyRate', Number(e.target.value))} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Decision</Label>
              <Select value={decision} onValueChange={v => setDecision(v as typeof decision)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="APPROVED">Approve</SelectItem>
                  <SelectItem value="REJECTED">Reject</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {decision === 'REJECTED' && (
              <div className="space-y-1.5">
                <Label>Rejection Reason</Label>
                <Textarea placeholder="Explain why the profile is being rejected…" value={rejectionReason} onChange={e => setRejectionReason(e.target.value)} />
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                variant={decision === 'APPROVED' ? 'success' : 'destructive'}
                loading={approving}
                onClick={handleApprove}
              >
                {decision === 'APPROVED' ? 'Approve Driver' : 'Reject Driver'}
              </Button>
              <Button variant="outline" onClick={() => navigate('/drivers')}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Already reviewed */}
      {driver.driverStatus !== 'PENDING' && (
        <Card>
          <CardContent className="p-4 flex items-center gap-3 text-sm text-slate-600">
            {driver.driverStatus === 'APPROVED'
              ? <CheckCircle className="h-4 w-4 text-emerald-500" />
              : <XCircle className="h-4 w-4 text-red-500" />}
            This driver has been <strong>{driver.driverStatus.toLowerCase()}</strong>.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
