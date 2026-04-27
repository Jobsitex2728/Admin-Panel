import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@/store'
import { logout, setTokens } from '@/store/authSlice'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://18.188.80.198/api/v1'

const rawBase = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await rawBase(args, api, extraOptions)

  if (result.error?.status === 401) {
    const state = api.getState() as RootState
    const refreshToken = state.auth.refreshToken

    if (refreshToken) {
      const refreshResult = await rawBase(
        { url: '/auth/refresh', method: 'POST', body: { refreshToken } },
        api,
        extraOptions,
      )

      if (refreshResult.data) {
        const data = (refreshResult.data as { data?: { accessToken: string; refreshToken: string } }).data
          ?? (refreshResult.data as { accessToken: string; refreshToken: string })
        api.dispatch(setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken }))
        result = await rawBase(args, api, extraOptions)
      } else {
        api.dispatch(logout())
      }
    } else {
      api.dispatch(logout())
    }
  }

  // Unwrap backend envelope { success, data, message }
  if (result.data && typeof result.data === 'object' && 'data' in result.data) {
    result = { ...result, data: (result.data as { data: unknown }).data }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Dashboard', 'Users', 'Drivers', 'Jobs', 'TruckTypes', 'Withdrawals', 'CMS', 'CmsPage'],
  endpoints: () => ({}),
})
