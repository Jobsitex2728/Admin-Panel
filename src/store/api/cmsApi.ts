import { baseApi } from './baseApi'

export interface CmsPage {
  id: string
  slug: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface UpsertCmsPageBody {
  title: string
  content: string
}

const cmsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    listCmsPages: build.query<CmsPage[], void>({
      query: () => '/admin/cms',
      providesTags: [{ type: 'CmsPage', id: 'LIST' }],
    }),
    upsertCmsPage: build.mutation<CmsPage, { slug: string; body: UpsertCmsPageBody }>({
      query: ({ slug, body }) => ({ url: `/admin/cms/${slug}`, method: 'PUT', body }),
      invalidatesTags: [{ type: 'CmsPage', id: 'LIST' }],
    }),
  }),
})

export const { useListCmsPagesQuery, useUpsertCmsPageMutation } = cmsApi
