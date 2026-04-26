import { baseApi } from './baseApi'
import type { User, GetUsersParams, UsersResponse } from '@/types/user'

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UsersResponse, GetUsersParams>({
      query: (params) => ({ url: '/admin/users', params }),
      providesTags: ['Users'],
    }),
    blockUser: build.mutation<User, string>({
      query: (id) => ({ url: `/admin/users/${id}/block`, method: 'POST' }),
      invalidatesTags: ['Users'],
    }),
    unblockUser: build.mutation<User, string>({
      query: (id) => ({ url: `/admin/users/${id}/unblock`, method: 'POST' }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({ url: `/admin/users/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Users', 'Dashboard'],
    }),
  }),
})

export const { useGetUsersQuery, useBlockUserMutation, useUnblockUserMutation, useDeleteUserMutation } = usersApi
