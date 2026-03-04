import type { DashboardData } from '../../types/dashboard.types'
import { baseApi } from './baseApi';

export const dashboardApi = baseApi.injectEndpoints ({
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardData, string>({
      query: () => `dashboard`,
    }),
  }),
})


export const { useGetDashboardQuery } = dashboardApi;