import { baseApi } from './baseApi'
import type { LoginRequest, AuthTokens, AuthUser } from '@/types/auth'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ accessToken: string; refreshToken: string; user: AuthUser }, LoginRequest>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
    forgotPassword: build.mutation<void, { email: string }>({
      query: (body) => ({ url: '/auth/forgot-password', method: 'POST', body }),
    }),
    resetPassword: build.mutation<void, { email: string; code: string; newPassword: string }>({
      query: (body) => ({ url: '/auth/reset-password', method: 'POST', body }),
    }),
    refreshToken: build.mutation<AuthTokens, { refreshToken: string }>({
      query: (body) => ({ url: '/auth/refresh', method: 'POST', body }),
    }),
  }),
})

export const { useLoginMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi
