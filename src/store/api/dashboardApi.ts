import { baseApi } from './baseApi'
import type { DashboardStats } from '@/types/dashboard'

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardStats: build.query<DashboardStats, void>({
      query: () => '/admin/dashboard',
      providesTags: ['Dashboard'],
    }),
  }),
})

export const { useGetDashboardStatsQuery } = dashboardApi
