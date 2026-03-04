import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Star, 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign,
  Award,
  FileText,
  Shield
} from 'lucide-react';
import { useGetDriverProfileQuery } from '../redux/services/driverApi';
import Avatar from '../components/shared/Avatar';
import Button from '../components/shared/Button';
import StatusBadge from '../components/shared/StatusBadge';
import DriverProfileError from '../components/driverManagement/DriverProfileError';
import DriverProfileSkeleton from '../components/driverManagement/DriverProfileSkeleton';


export default function DriverProfile() {
  const { driverId } = useParams<{ driverId: string }>();
  const navigate = useNavigate();
  const [showAllReviews, setShowAllReviews] = useState(false);

  const { data: driver, isLoading, error, refetch } = useGetDriverProfileQuery(driverId || '');

  if (isLoading) return <DriverProfileSkeleton />;
  if (error || !driver) return <DriverProfileError onRetry={refetch} />;

  const displayedReviews = showAllReviews 
    ? driver.ratings.reviews 
    : driver.ratings.reviews.slice(0, 2);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with back button */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate('/drivers')}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Driver / Driver Profile</h1>
          <p className="text-sm text-gray-600 mt-1">View and manage driver details</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar src={driver.personalInfo.avatar} name={driver.personalInfo.name} size="lg" />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">{driver.personalInfo.name}</h2>
              <p className="text-sm text-gray-500">
                Joined {driver.personalInfo.joinedDate} • {driver.personalInfo.rating} 
                <Star className="inline w-4 h-4 text-yellow-400 ml-1" fill="currentColor" />
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{driver.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{driver.personalInfo.phoneNumber}</span>
              </div>
              {driver.personalInfo.address && (
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-600">
                    {driver.personalInfo.address.street}, {driver.personalInfo.address.city}, {' '}
                    {driver.personalInfo.address.state} {driver.personalInfo.address.zipCode}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Admin Controls */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Controls</h3>
            <div className="space-y-3">
              {driver.adminControls?.canSuspend && (
                <Button variant="danger" className="w-full justify-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Suspend
                </Button>
              )}
              {driver.adminControls?.canViewDocuments && (
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => navigate(`/drivers/${driverId}/documents`)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Documents
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Middle Column - Stats & Job History */}
        <div className="col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Distance</p>
                  <p className="text-xl font-semibold text-gray-900">{driver.stats.totalDistance} mi</p>
                </div>
                <Truck className="w-8 h-8 text-blue-500 bg-blue-100 p-1.5 rounded-lg" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Jobs Completed</p>
                  <p className="text-xl font-semibold text-gray-900">{driver.stats.jobsCompleted}</p>
                </div>
                <Award className="w-8 h-8 text-green-500 bg-green-100 p-1.5 rounded-lg" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">EST. Duration</p>
                  <p className="text-xl font-semibold text-gray-900">{driver.stats.estimatedDuration} hrs</p>
                </div>
                <Clock className="w-8 h-8 text-purple-500 bg-purple-100 p-1.5 rounded-lg" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                  <p className="text-xl font-semibold text-gray-900">${driver.stats.totalEarnings}</p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-500 bg-yellow-100 p-1.5 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Assigned Vehicle */}
          {driver.assignedVehicle && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Vehicle</h3>
              <div className="flex gap-6">
                <div className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  {driver.assignedVehicle.images[0]?.url ? (
                    <img 
                      src={driver.assignedVehicle.images[0].url} 
                      alt={driver.assignedVehicle.model}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Truck className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{driver.assignedVehicle.model}</h4>
                  <p className="text-sm text-gray-500 mt-1">{driver.assignedVehicle.type}</p>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Truck type</p>
                      <p className="text-sm font-medium">{driver.assignedVehicle.specifications.truckType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payload Capacity</p>
                      <p className="text-sm font-medium">{driver.assignedVehicle.specifications.payloadCapacity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Axle Count</p>
                      <p className="text-sm font-medium">{driver.assignedVehicle.specifications.axleCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Hourly Rate</p>
                      <p className="text-sm font-medium">${driver.assignedVehicle.specifications.hourlyRate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Job History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Job ID</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Date</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Route</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Amount</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {driver.jobHistory.map((job) => (
                    <tr key={job.jobId}>
                      <td className="py-3 text-sm font-medium text-gray-900">{job.jobId}</td>
                      <td className="py-3 text-sm text-gray-600">{job.date}</td>
                      <td className="py-3 text-sm text-gray-600">{job.route.from} → {job.route.to}</td>
                      <td className="py-3 text-sm text-gray-900">${job.amount}</td>
                      <td className="py-3">
                        <StatusBadge status={job.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Ratings */}
        <div className="space-y-6">
          {/* Ratings Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Ratings & Reviews</h3>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-gray-900">{driver.ratings.average}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(driver.ratings.average)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">{driver.ratings.totalCount} reviews</p>

            {/* Reviews List */}
            <div className="space-y-4">
              {displayedReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar src={review.reviewerAvatar} name={review.reviewerName} size="sm" />
                      <span className="font-medium text-gray-900">{review.reviewerName}</span>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{review.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                </div>
              ))}
            </div>

            {driver.ratings.reviews.length > 2 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {showAllReviews ? 'Show Less' : 'View All Reviews'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}