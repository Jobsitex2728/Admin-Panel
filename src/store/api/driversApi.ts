import { baseApi } from './baseApi'
import type { DriverProfile, DriverListItem, GetDriversParams, DriversResponse, ApproveDriverRequest } from '@/types/driver'
import type { Document } from '@/types/driver'

export const driversApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDrivers: build.query<DriversResponse, GetDriversParams>({
      query: (params) => ({ url: '/admin/drivers', params }),
      providesTags: ['Drivers'],
    }),
    getPendingDrivers: build.query<DriverListItem[], void>({
      query: () => '/admin/drivers/pending',
      providesTags: ['Drivers'],
    }),
    getDriver: build.query<DriverProfile, string>({
      query: (id) => `/admin/drivers/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Drivers', id }],
    }),
    approveDriver: build.mutation<void, { id: string; body: ApproveDriverRequest }>({
      query: ({ id, body }) => ({ url: `/admin/drivers/${id}/approve`, method: 'POST', body }),
      invalidatesTags: ['Drivers', 'Dashboard'],
    }),
    reviewDocument: build.mutation<Document, { id: string; status: 'APPROVED' | 'REJECTED'; rejectionReason?: string }>({
      query: ({ id, ...body }) => ({ url: `/admin/documents/${id}/review`, method: 'POST', body }),
      invalidatesTags: ['Drivers', 'Dashboard'],
    }),
  }),
})

export const {
  useGetDriversQuery,
  useGetPendingDriversQuery,
  useGetDriverQuery,
  useApproveDriverMutation,
  useReviewDocumentMutation,
} = driversApi
