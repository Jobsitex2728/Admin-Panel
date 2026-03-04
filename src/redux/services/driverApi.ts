import type { 
  DriverListItem, 
  DriverProfile, 
  DriverDocuments, 
  GetDriversParams,
  DocumentStatus 
} from '../../types/driver.types';
import type { PaginatedResponse } from '../../types/shared.types';
import { baseApi } from './baseApi';

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // This now matches your Mirage endpoint
    getDrivers: builder.query<PaginatedResponse<DriverListItem>, GetDriversParams>({
      query: (params) => ({
        url: `/drivers`,  // Will be /api/drivers because of baseUrl
        params,           // Pass params directly - Mirage will handle them
      }),
      transformResponse: (response: any) => {
        // Mirage already returns the format we want
        return response;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Drivers' as const, id })),
              { type: 'Drivers', id: 'LIST' },
            ]
          : [{ type: 'Drivers', id: 'LIST' }],
    }),

    // Get single driver
    getDriver: builder.query<DriverListItem, string>({
      query: (id) => `/drivers/${id}`,
      providesTags: (_, __, id) => [{ type: 'Drivers', id }],
    }),

    // Get driver profile
    getDriverProfile: builder.query<DriverProfile, string>({
      query: (driverId) => `/driver-profiles/${driverId}`,
      providesTags: (_, __, id) => [{ type: 'Drivers', id }],
    }),

    // Get driver documents
    getDriverDocuments: builder.query<DriverDocuments, string>({
      query: (driverId) => `/driver-documents/${driverId}`,
      providesTags: (_, __, id) => [{ type: 'Drivers', id, docType: 'documents' }],
    }),

    // Update document status
    updateDocumentStatus: builder.mutation<
      DriverDocuments,
      { driverId: string; documentId: string; status: DocumentStatus; comments?: string }
    >({
      query: ({ driverId, documentId, ...body }) => ({
        url: `/driver-documents/${driverId}/documents/${documentId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { driverId }) => [
        { type: 'Drivers', id: driverId },
        { type: 'Drivers', id: driverId, docType: 'documents' },
      ],
    }),

    // Toggle driver block
    toggleDriverBlock: builder.mutation<DriverListItem, { id: string; blocked: boolean }>({
      query: ({ id, blocked }) => ({
        url: `/drivers/${id}`,
        method: 'PATCH',
        body: { blocked },
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Drivers', id },
        { type: 'Drivers', id: 'LIST' },
      ],
    }),

    // Export drivers
    exportDrivers: builder.mutation<Blob, GetDriversParams>({
      query: (params) => ({
        url: '/drivers/export',
        method: 'POST',
        params,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetDriversQuery,
  useGetDriverQuery,
  useGetDriverProfileQuery,
  useGetDriverDocumentsQuery,
  useUpdateDocumentStatusMutation,
  useToggleDriverBlockMutation,
  useExportDriversMutation,
} = driverApi;