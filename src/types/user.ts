export type UserRole = 'CUSTOMER' | 'DRIVER' | 'ADMIN'
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  status: UserStatus
  isEmailVerified: boolean
  avatar?: string
  createdAt: string
  driverProfile?: {
    driverStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
    isProfileComplete: boolean
    isAvailable: boolean
  } | null
}

export interface GetUsersParams {
  page?: number
  limit?: number
  role?: UserRole
  status?: UserStatus
}

export interface UsersResponse {
  users: User[]
  total: number
  page: number
  limit: number
}
