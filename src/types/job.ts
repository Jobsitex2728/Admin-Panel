export type JobStatus =
  | 'PENDING' | 'BROADCAST' | 'BOOKED' | 'ON_WAY'
  | 'ARRIVED' | 'LOADED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED'

export interface Job {
  id: string
  status: JobStatus
  pickupAddress: string
  pickupLat: number
  pickupLng: number
  dropoffAddress: string
  dropoffLat: number
  dropoffLng: number
  estimatedFare?: number
  finalFare?: number
  distanceKm?: number
  scheduledAt: string
  createdAt: string
  workNote?: string
  truckType: { name: string }
  customer: { user: { fullName: string; email: string; avatar?: string } }
  driver?: { user: { fullName: string; email: string; avatar?: string } } | null
  payment?: {
    status: string
    amount: number
    platformFee: number
    driverPayout: number
    paidAt?: string
  } | null
  review?: { rating: number; comment?: string } | null
}

export interface GetJobsParams {
  page?: number
  limit?: number
  status?: JobStatus
}

export interface JobsResponse {
  jobs: Job[]
  total: number
  page: number
  limit: number
}
