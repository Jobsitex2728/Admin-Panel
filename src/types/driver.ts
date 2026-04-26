export type DriverStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type DocumentStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type DocumentType = 'CDL_LICENSE' | 'INSURANCE' | 'DOT_NUMBER' | 'TRUCK_PHOTO'

export interface Document {
  id: string
  type: DocumentType
  fileUrl: string
  status: DocumentStatus
  rejectionReason?: string
  reviewedAt?: string
  ocrData?: Record<string, unknown>
}

export interface DriverProfile {
  id: string
  userId: string
  driverStatus: DriverStatus
  isProfileComplete: boolean
  isAvailable: boolean
  truckTypeId?: string
  truckType?: { id: string; name: string }
  numberPlate?: string
  truckModel?: string
  truckWeight?: number
  trailerType?: string
  truckPhotoUrl?: string
  hourlyRate?: number
  totalEarnings: number
  currentBalance: number
  stripeOnboarded: boolean
  createdAt: string
  updatedAt: string
  user: {
    id: string
    fullName: string
    email: string
    avatar?: string
    status: string
    createdAt: string
  }
  documents: Document[]
  reviews: Array<{ rating: number; comment?: string; createdAt: string }>
  _count: { jobs: number }
}

export interface DriverListItem {
  id: string
  userId: string
  driverStatus: DriverStatus
  isProfileComplete: boolean
  isAvailable: boolean
  truckType?: { id: string; name: string }
  numberPlate?: string
  truckModel?: string
  hourlyRate?: number
  createdAt: string
  user: { id: string; fullName: string; email: string; avatar?: string; status: string }
  _count: { documents: number; jobs: number }
}

export interface GetDriversParams {
  page?: number
  limit?: number
  status?: DriverStatus
}

export interface DriversResponse {
  drivers: DriverListItem[]
  total: number
  page: number
  limit: number
}

export interface ApproveDriverRequest {
  decision: 'APPROVED' | 'REJECTED'
  rejectionReason?: string
  truckTypeId?: string
  numberPlate?: string
  truckModel?: string
  truckWeight?: number
  trailerType?: string
  hourlyRate?: number
}
