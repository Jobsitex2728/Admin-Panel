export type WithdrawalStatus = 'PENDING' | 'COMPLETED' | 'REJECTED'

export interface Withdrawal {
  id: string
  amount: number
  status: WithdrawalStatus
  stripeTransferId?: string
  processedAt?: string
  createdAt: string
  driverProfile: {
    user: { fullName: string; email: string }
  }
}
