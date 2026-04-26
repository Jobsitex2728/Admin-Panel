import { useState } from 'react'
import { Search, Trash2, Ban, CheckCircle, MoreHorizontal } from 'lucide-react'
import { useGetUsersQuery, useBlockUserMutation, useUnblockUserMutation, useDeleteUserMutation } from '@/store/api/usersApi'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { Pagination } from '@/components/shared/Pagination'
import { PageHeader } from '@/components/shared/PageHeader'
import { formatDate, getInitials } from '@/lib/utils'
import type { User, UserRole, UserStatus } from '@/types/user'
import { toast } from 'sonner'

type ActionType = 'block' | 'unblock' | 'delete'

export default function UsersPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState<UserRole | ''>('')
  const [status, setStatus] = useState<UserStatus | ''>('')
  const [action, setAction] = useState<{ type: ActionType; user: User } | null>(null)

  const { data, isLoading } = useGetUsersQuery({
    page, limit: 10,
    role: role || undefined,
    status: status || undefined,
  })

  const [blockUser, { isLoading: blocking }] = useBlockUserMutation()
  const [unblockUser, { isLoading: unblocking }] = useUnblockUserMutation()
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation()

  const filtered = data?.users.filter((u: User) =>
    !search || u.fullName.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  const handleConfirm = async () => {
    if (!action) return
    try {
      if (action.type === 'block') { await blockUser(action.user.id).unwrap(); toast.success('User blocked') }
      else if (action.type === 'unblock') { await unblockUser(action.user.id).unwrap(); toast.success('User unblocked') }
      else { await deleteUser(action.user.id).unwrap(); toast.success('User deleted') }
      setAction(null)
    } catch { toast.error('Action failed') }
  }

  return (
    <div>
      <PageHeader title="Users" description="Manage all customers and drivers" />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search by name or email…" className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={role || 'all'} onValueChange={v => { setRole(v === 'all' ? '' : v as UserRole); setPage(1) }}>
          <SelectTrigger className="w-36"><SelectValue placeholder="All roles" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="CUSTOMER">Customer</SelectItem>
            <SelectItem value="DRIVER">Driver</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status || 'all'} onValueChange={v => { setStatus(v === 'all' ? '' : v as UserStatus); setPage(1) }}>
          <SelectTrigger className="w-36"><SelectValue placeholder="All status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="SUSPENDED">Blocked</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Joined</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3" colSpan={5}><Skeleton className="h-10 w-full" /></td>
                    </tr>
                  ))
                : filtered.map((user: User) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{user.fullName}</p>
                            <p className="text-xs text-slate-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-slate-600 capitalize">{user.role.toLowerCase()}</span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={user.status} type="user" />
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm text-slate-500">{formatDate(user.createdAt)}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {user.status === 'SUSPENDED' ? (
                              <DropdownMenuItem onClick={() => setAction({ type: 'unblock', user })}>
                                <CheckCircle className="h-4 w-4" /> Unblock
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => setAction({ type: 'block', user })}>
                                <Ban className="h-4 w-4" /> Block
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem destructive onClick={() => setAction({ type: 'delete', user })}>
                              <Trash2 className="h-4 w-4" /> Delete permanently
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>

          {!isLoading && filtered.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm">No users found.</div>
          )}

          {data && (
            <Pagination page={page} total={data.total} limit={10} onPageChange={setPage} />
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={!!action}
        onOpenChange={(o) => { if (!o) setAction(null) }}
        title={
          action?.type === 'delete' ? 'Delete user permanently?' :
          action?.type === 'block' ? 'Block this user?' : 'Unblock this user?'
        }
        description={
          action?.type === 'delete'
            ? `This will permanently delete ${action.user.fullName} and all their data including documents, jobs, and files. This cannot be undone.`
            : action?.type === 'block'
            ? `${action?.user.fullName} will be blocked and unable to use the platform.`
            : `${action?.user.fullName} will be able to use the platform again.`
        }
        confirmLabel={action?.type === 'delete' ? 'Delete' : action?.type === 'block' ? 'Block' : 'Unblock'}
        variant={action?.type === 'delete' || action?.type === 'block' ? 'destructive' : 'default'}
        loading={blocking || unblocking || deleting}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
