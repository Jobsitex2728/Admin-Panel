
import type { Job, JobsQueryParams } from '../../types/job.types';
import type { PaginatedResponse } from '../../types/shared.types';
import { baseApi } from './baseApi';

export const jobsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobs: builder.query<PaginatedResponse<Job>, JobsQueryParams>({
            query: (params) => ({
                url: `/jobs?jobId:contains=${params.search || ''}`,
                params: {
                    _page: params.page || 1,
                    _per_page: params.limit || 10,
                    truckType: params.truckType? params.truckType : undefined,

                },
            }),

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformResponse: (response: any ) => {
                const jobs = response.data;               
                const total = response.items;             
                const currentPage = response.first;

                return {
                    data: jobs,                                    
                    pagination: {
                        total: total,                              
                        page: currentPage,                         
                        limit: 10,                    
                    }
                };
            },

            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Jobs' as const, id })),
                        { type: 'Jobs', id: 'LIST' },
                    ]
                    : [{ type: 'Jobs', id: 'LIST' }],
        }),

        getJobById: builder.query<Job, string>({
            query: (id) => `/jobs/${id}`,
            providesTags: (_, __, id) => [{ type: 'Jobs', id }],
        }),

        updateJobStatus: builder.mutation<Job, { id: string; status: Job['status'] }>({
            query: ({ id, status }) => ({
                url: `/jobs/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'Jobs', id }, { type: 'Jobs', id: 'LIST' }],
        }),

        toggleJobBlock: builder.mutation<Job, { id: string; blocked: boolean }>({
            query: ({ id, blocked }) => ({
                url: `/jobs/${id}/block`,
                method: 'PATCH',
                body: { blocked },
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'Jobs', id }, { type: 'Jobs', id: 'LIST' }],
        }),

        exportJobs: builder.mutation<Blob, JobsQueryParams>({
            query: (params) => ({
                url: '/jobs/export',
                method: 'POST',
                params,
                responseHandler: (response) => response.blob(),
            }),
        }),
    }),
});

export const {
    useGetJobsQuery,
    useGetJobByIdQuery,
    useUpdateJobStatusMutation,
    useToggleJobBlockMutation,
    useExportJobsMutation,
} = jobsApi;