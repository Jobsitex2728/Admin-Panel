import { baseApi } from './baseApi'
import type { Job, GetJobsParams, JobsResponse } from '@/types/job'

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getJobs: build.query<JobsResponse, GetJobsParams>({
      query: (params) => ({ url: '/admin/jobs', params }),
      providesTags: ['Jobs'],
    }),
    getJob: build.query<Job, string>({
      query: (id) => `/admin/jobs/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Jobs', id }],
    }),
  }),
})

export const { useGetJobsQuery, useGetJobQuery } = jobsApi
