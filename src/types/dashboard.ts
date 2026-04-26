export interface DashboardStats {
  users: {
    total: number
    blocked: number
    drivers: number
    approvedDrivers: number
    customers: number
    newThisMonth: number
  }
  jobs: {
    active: number
    completed: number
    cancelled: number
    total: number
  }
  approvals: {
    pendingDrivers: number
    pendingDocuments: number
  }
  revenue: {
    total: number
    thisMonth: number
    monthly: { month: string; revenue: number }[]
  }
}
