
export interface DriverListItem {
  id: string;
  driverId: string;
  name: string;
  truckAssigned: TruckAssignment;
  phoneNumber: string;
  availability: 'Online' | 'Offline' | 'On Trip' | 'Break';
  status: 'Verified' | 'Pending' | 'Rejected' | 'Suspended';
  rating?: number;
  joinedDate?: string;
  avatar?: string;
  blocked?: boolean;
}

export interface TruckAssignment {
  model: string;
  type: string;
  licensePlate: string;
  isAssigned: boolean;
}

export interface DriverProfile {
  id: string;
  personalInfo: PersonalInfo;
  stats: DriverStats;
  assignedVehicle?: Vehicle;
  jobHistory: JobHistoryItem[];
  ratings: Ratings;
  adminControls?: AdminControls;
}

export interface PersonalInfo {
  name: string;
  driverId: string;
  email: string;
  phoneNumber: string;
  joinedDate: string;
  rating: number;
  avatar?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface DriverStats {
  totalDistance: number;
  jobsCompleted: number;
  estimatedDuration: number;
  averageRating: number;
  totalEarnings?: number;
}

export interface Vehicle {
  id: string;
  model: string;
  type: string;
  licensePlate: string;
  year: number;
  images: VehicleImage[];
  specifications: VehicleSpecs;
}

export interface VehicleImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

export interface VehicleSpecs {
  truckType: string;
  payloadCapacity: string;
  axleCount: number;
  hourlyRate: number;
  fuelType?: string;
  transmission?: string;
}

export interface JobHistoryItem {
  jobId: string;
  date: string;
  route: {
    from: string;
    to: string;
  };
  amount: number;
  status: 'Delivered' | 'Canceled' | 'In Transit' | 'Pending' | 'Completed';
  distance?: number;
  duration?: string;
}

export interface Ratings {
  average: number;
  totalCount: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar?: string;
  rating: number;
  content: string;
  date: string;
  jobId?: string;
}

export interface AdminControls {
  canSuspend?: boolean;
  canViewDocuments?: boolean;
  canApproveDocuments?: boolean;
  currentStatus?: string;
}

export interface DriverDocuments {
  driverId: string;
  driverName: string;
  documents: Document[];
  verificationSteps: VerificationStep[];
  adminControls?: DocumentAdminControls;
}

export interface Document {
  id: string;
  type: 'License' | 'Insurance' | 'Registration' | 'Inspection' | 'Background Check';
  documentNumber: string;
  expirationDate: string;
  stateOfIssue?: string;
  imageUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Expired' | 'Request Re-upload';
  uploadedAt: string;
  reviewedAt?: string;
  history: DocumentHistory[];
}

export interface DocumentHistory {
  id: string;
  action: 'Upload' | 'Approve' | 'Reject' | 'Request Re-upload' | 'Expire';
  performedBy: string;
  performedAt: string;
  comments?: string;
}

export interface VerificationStep {
  id: number;
  name: string;
  status: 'Completed' | 'Pending' | 'In Progress' | 'Failed' | 'Action Required';
  date?: string;
  details?: string;
  assignedTo?: string;
}

export interface DocumentAdminControls {
  canApprove: boolean;
  canRequestReupload: boolean;
  canViewHistory: boolean;
  historyCount: number;
}

export interface GetDriversParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  availability?: string;
}

export type DriverStatus = 'Verified' | 'Pending' | 'Rejected' | 'Suspended';
export type DriverAvailability = 'Online' | 'Offline' | 'On Trip' | 'Break';
export type DocumentStatus = 'Pending' | 'Approved' | 'Rejected' | 'Expired' | 'Request Re-upload';
export type DocumentType = 'License' | 'Insurance' | 'Registration' | 'Inspection' | 'Background Check';
export type VerificationStepStatus = 'Completed' | 'Pending' | 'In Progress' | 'Failed' | 'Action Required';