import { Badge } from '@/components/ui/badge'
import type { BadgeProps } from '@/components/ui/badge'

type Variant = BadgeProps['variant']

const userStatusMap: Record<string, Variant> = {
  ACTIVE: 'success',
  INACTIVE: 'default',
  SUSPENDED: 'danger',
}

const driverStatusMap: Record<string, Variant> = {
  APPROVED: 'success',
  PENDING: 'warning',
  REJECTED: 'danger',
}

const docStatusMap: Record<string, Variant> = {
  APPROVED: 'success',
  PENDING: 'warning',
  REJECTED: 'danger',
}

const jobStatusMap: Record<string, Variant> = {
  PENDING: 'default',
  BROADCAST: 'info',
  BOOKED: 'purple',
  ON_WAY: 'orange',
  ARRIVED: 'orange',
  LOADED: 'orange',
  IN_TRANSIT: 'orange',
  DELIVERED: 'success',
  CANCELLED: 'danger',
}

const readableLabel: Record<string, string> = {
  ON_WAY: 'On Way',
  IN_TRANSIT: 'In Transit',
}

type BadgeType = 'user' | 'driver' | 'document' | 'job'

interface StatusBadgeProps {
  status: string
  type?: BadgeType
}

const maps: Record<BadgeType, Record<string, Variant>> = {
  user: userStatusMap,
  driver: driverStatusMap,
  document: docStatusMap,
  job: jobStatusMap,
}

export function StatusBadge({ status, type = 'user' }: StatusBadgeProps) {
  const variant = maps[type][status] ?? 'default'
  const label = readableLabel[status] ?? (status.charAt(0) + status.slice(1).toLowerCase())
  return <Badge variant={variant}>{label}</Badge>
}
