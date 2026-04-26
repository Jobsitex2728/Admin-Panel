import { baseApi } from './baseApi'
import type { Withdrawal } from '@/types/withdrawal'

export const withdrawalsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPendingWithdrawals: build.query<Withdrawal[], void>({
      query: () => '/admin/withdrawals/pending',
      providesTags: ['Withdrawals'],
    }),
    processWithdrawal: build.mutation<void, string>({
      query: (id) => ({ url: `/admin/withdrawals/${id}/process`, method: 'POST' }),
      invalidatesTags: ['Withdrawals', 'Dashboard'],
    }),
  }),
})

export const { useGetPendingWithdrawalsQuery, useProcessWithdrawalMutation } = withdrawalsApi
