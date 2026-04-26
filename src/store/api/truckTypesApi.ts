import { baseApi } from './baseApi'
import type { TruckType, TruckTypeFormData } from '@/types/truck'

export const truckTypesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTruckTypes: build.query<TruckType[], void>({
      query: () => '/admin/truck-types',
      providesTags: ['TruckTypes'],
    }),
    createTruckType: build.mutation<TruckType, TruckTypeFormData>({
      query: (body) => ({ url: '/admin/truck-types', method: 'POST', body }),
      invalidatesTags: ['TruckTypes'],
    }),
    updateTruckType: build.mutation<TruckType, { id: string; body: Partial<TruckTypeFormData> & { isActive?: boolean } }>({
      query: ({ id, body }) => ({ url: `/admin/truck-types/${id}`, method: 'PATCH', body }),
      invalidatesTags: ['TruckTypes'],
    }),
    deleteTruckType: build.mutation<void, string>({
      query: (id) => ({ url: `/admin/truck-types/${id}`, method: 'DELETE' }),
      invalidatesTags: ['TruckTypes'],
    }),
  }),
})

export const {
  useGetTruckTypesQuery,
  useCreateTruckTypeMutation,
  useUpdateTruckTypeMutation,
  useDeleteTruckTypeMutation,
} = truckTypesApi
