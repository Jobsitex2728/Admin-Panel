export interface TruckType {
  id: string
  name: string
  description?: string
  payloadCapacity?: number
  axleCount?: number
  baseFare: number
  distanceRatePerKm: number
  timeRatePerHour: number
  capacityMultiplier: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface TruckTypeFormData {
  name: string
  description?: string
  payloadCapacity?: number
  axleCount?: number
  baseFare: number
  distanceRatePerKm: number
  timeRatePerHour: number
  capacityMultiplier?: number
}
