import { useState } from 'react'
import { Plus, Pencil, Trash2, TruckIcon } from 'lucide-react'
import { useGetTruckTypesQuery, useCreateTruckTypeMutation, useUpdateTruckTypeMutation, useDeleteTruckTypeMutation } from '@/store/api/truckTypesApi'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogBody, DialogTitle } from '@/components/ui/dialog'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { formatCurrency } from '@/lib/utils'
import type { TruckType, TruckTypeFormData } from '@/types/truck'
import { toast } from 'sonner'

const EMPTY: TruckTypeFormData = {
  name: '', description: '', baseFare: 0, distanceRatePerKm: 0, timeRatePerHour: 0,
  payloadCapacity: undefined, axleCount: undefined, capacityMultiplier: undefined,
}

export default function TruckTypesPage() {
  const { data: truckTypes, isLoading } = useGetTruckTypesQuery()
  const [createTruckType, { isLoading: creating }] = useCreateTruckTypeMutation()
  const [updateTruckType, { isLoading: updating }] = useUpdateTruckTypeMutation()
  const [deleteTruckType, { isLoading: deleting }] = useDeleteTruckTypeMutation()

  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<TruckType | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<TruckType | null>(null)
  const [form, setForm] = useState<TruckTypeFormData>(EMPTY)

  const openCreate = () => { setEditTarget(null); setForm(EMPTY); setFormOpen(true) }
  const openEdit = (t: TruckType) => {
    setEditTarget(t)
    setForm({
      name: t.name, description: t.description ?? '', baseFare: t.baseFare,
      distanceRatePerKm: t.distanceRatePerKm, timeRatePerHour: t.timeRatePerHour,
      payloadCapacity: t.payloadCapacity, axleCount: t.axleCount, capacityMultiplier: t.capacityMultiplier,
    })
    setFormOpen(true)
  }

  const f = (key: keyof TruckTypeFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [key]: ['name', 'description'].includes(key) ? e.target.value : Number(e.target.value) || undefined }))

  const handleSubmit = async () => {
    if (!form.name || !form.baseFare) return toast.error('Name and base fare are required')
    try {
      if (editTarget) {
        await updateTruckType({ id: editTarget.id, body: form }).unwrap()
        toast.success('Truck type updated')
      } else {
        await createTruckType(form).unwrap()
        toast.success('Truck type created')
      }
      setFormOpen(false)
    } catch { toast.error('Failed to save') }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteTruckType(deleteTarget.id).unwrap()
      toast.success('Truck type deleted')
      setDeleteTarget(null)
    } catch { toast.error('Failed to delete') }
  }

  return (
    <div>
      <PageHeader
        title="Truck Types"
        description="Configure truck categories and fare settings"
        action={<Button onClick={openCreate}><Plus className="h-4 w-4" />Add Truck Type</Button>}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-40 w-full rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {truckTypes?.map((t: TruckType) => (
            <Card key={t.id} className="relative">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                      <TruckIcon className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{t.name}</h3>
                      {t.description && <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{t.description}</p>}
                    </div>
                  </div>
                  <Badge variant={t.isActive ? 'success' : 'default'}>{t.isActive ? 'Active' : 'Inactive'}</Badge>
                </div>

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Base fare</span>
                    <span className="font-medium">{formatCurrency(t.baseFare)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Per km</span>
                    <span className="font-medium">{formatCurrency(t.distanceRatePerKm)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Per hour</span>
                    <span className="font-medium">{formatCurrency(t.timeRatePerHour)}</span>
                  </div>
                  {t.payloadCapacity && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Payload</span>
                      <span className="font-medium">{t.payloadCapacity.toLocaleString()} lbs</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(t)}>
                    <Pencil className="h-3.5 w-3.5" />Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200" onClick={() => setDeleteTarget(t)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {!isLoading && (!truckTypes || truckTypes.length === 0) && (
            <div className="col-span-3 py-16 text-center text-slate-400">
              <TruckIcon className="h-8 w-8 mx-auto mb-2 text-slate-300" />
              <p>No truck types yet. Add one to get started.</p>
            </div>
          )}
        </div>
      )}

      {/* Create / Edit modal */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>{editTarget ? 'Edit Truck Type' : 'Add Truck Type'}</DialogTitle>
          </DialogHeader>
          <DialogBody className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Name *</Label>
                <Input placeholder="e.g. Flatbed" value={form.name} onChange={f('name')} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Description</Label>
                <Textarea placeholder="Optional description" value={form.description ?? ''} onChange={f('description')} />
              </div>
              <div className="space-y-1.5">
                <Label>Base Fare ($) *</Label>
                <Input type="number" min={0} value={form.baseFare || ''} onChange={f('baseFare')} />
              </div>
              <div className="space-y-1.5">
                <Label>Rate per km ($) *</Label>
                <Input type="number" min={0} step={0.01} value={form.distanceRatePerKm || ''} onChange={f('distanceRatePerKm')} />
              </div>
              <div className="space-y-1.5">
                <Label>Rate per hour ($) *</Label>
                <Input type="number" min={0} value={form.timeRatePerHour || ''} onChange={f('timeRatePerHour')} />
              </div>
              <div className="space-y-1.5">
                <Label>Capacity multiplier</Label>
                <Input type="number" min={0} step={0.1} placeholder="1.0" value={form.capacityMultiplier ?? ''} onChange={f('capacityMultiplier')} />
              </div>
              <div className="space-y-1.5">
                <Label>Payload (lbs)</Label>
                <Input type="number" min={0} value={form.payloadCapacity ?? ''} onChange={f('payloadCapacity')} />
              </div>
              <div className="space-y-1.5">
                <Label>Axle count</Label>
                <Input type="number" min={0} value={form.axleCount ?? ''} onChange={f('axleCount')} />
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button loading={creating || updating} onClick={handleSubmit}>
              {editTarget ? 'Save Changes' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={o => { if (!o) setDeleteTarget(null) }}
        title="Delete truck type?"
        description={`"${deleteTarget?.name}" will be permanently deleted. Existing jobs using this type will not be affected.`}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
      />
    </div>
  )
}
