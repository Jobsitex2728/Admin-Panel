import { useState } from 'react'
import { Wallet } from 'lucide-react'
import { useGetPendingWithdrawalsQuery, useProcessWithdrawalMutation } from '@/store/api/withdrawalsApi'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { formatCurrency, formatDate, getInitials } from '@/lib/utils'
import type { Withdrawal } from '@/types/withdrawal'
import { toast } from 'sonner'

export default function WithdrawalsPage() {
  const { data: withdrawals, isLoading } = useGetPendingWithdrawalsQuery()
  const [processWithdrawal, { isLoading: processing }] = useProcessWithdrawalMutation()
  const [target, setTarget] = useState<Withdrawal | null>(null)

  const handleProcess = async () => {
    if (!target) return
    try {
      await processWithdrawal(target.id).unwrap()
      toast.success('Withdrawal processed')
      setTarget(null)
    } catch { toast.error('Failed to process withdrawal') }
  }

  return (
    <div>
      <PageHeader title="Withdrawals" description="Pending driver payout requests" />

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Driver</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Requested</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}><td colSpan={4} className="px-4 py-3"><Skeleton className="h-10 w-full" /></td></tr>
                  ))
                : withdrawals?.map((w: Withdrawal) => (
                    <tr key={w.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{getInitials(w.driverProfile.user.fullName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{w.driverProfile.user.fullName}</p>
                            <p className="text-xs text-slate-400">{w.driverProfile.user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-base font-bold text-slate-900">{formatCurrency(w.amount)}</span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm text-slate-500">{formatDate(w.createdAt)}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button size="sm" onClick={() => setTarget(w)}>Process</Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {!isLoading && (!withdrawals || withdrawals.length === 0) && (
            <div className="py-16 text-center">
              <Wallet className="h-8 w-8 mx-auto mb-2 text-slate-300" />
              <p className="text-slate-400 text-sm">No pending withdrawals.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={!!target}
        onOpenChange={o => { if (!o) setTarget(null) }}
        title="Process withdrawal?"
        description={`Transfer ${target ? formatCurrency(target.amount) : ''} to ${target?.driverProfile.user.fullName}. This action cannot be undone.`}
        confirmLabel="Process"
        variant="default"
        loading={processing}
        onConfirm={handleProcess}
      />
    </div>
  )
}
