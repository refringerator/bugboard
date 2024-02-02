import { retry } from '@reduxjs/toolkit/query/react';
import { api } from './api';

export interface Issue {
  id: number;
  number: number;
  title: string;
  url: string;
  state: string;
  created_at: string;
  updated_at: string;
}

type IssuesResponse = Issue[];

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export const issuesApi = api.injectEndpoints({
  endpoints: (build) => ({
    // login: build.mutation<{ token: string; user: User }, any>({
    //   query: (credentials: any) => ({
    //     url: 'login',
    //     method: 'POST',
    //     body: credentials,
    //   }),
    //   extraOptions: {
    //     backoff: () => {
    //       // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
    //       retry.fail({ fake: 'error' });
    //     },
    //   },
    // }),
    getIssues: build.query<IssuesResponse, void>({
      query: () => ({ url: 'repos/refringerator/bugboard/issues' }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Issues', id }) as const),
        { type: 'Issues' as const, id: 'LIST' },
      ],
    }),
    // addPost: build.mutation<Issue, Partial<Issue>>({
    //   query: (body) => ({
    //     url: `posts`,
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    // }),
    getIssue: build.query<Issue, number>({
      query: (id) => `repos/refringerator/bugboard/issues/${id}`,
      providesTags: (_post, _err, id) => [{ type: 'Issues', id }],
    }),
    // updatePost: build.mutation<Issue, Partial<Issue>>({
    //   query(data) {
    //     const { id, ...body } = data;
    //     return {
    //       url: `posts/${id}`,
    //       method: 'PUT',
    //       body,
    //     };
    //   },
    //   invalidatesTags: (post) => [{ type: 'Posts', id: post?.id }],
    // }),
    // deletePost: build.mutation<{ success: boolean; id: number }, number>({
    //   query(id) {
    //     return {
    //       url: `posts/${id}`,
    //       method: 'DELETE',
    //     };
    //   },
    //   invalidatesTags: (post) => [{ type: 'Posts', id: post?.id }],
    // }),
    // getErrorProne: build.query<{ success: boolean }, void>({
    //   query: () => 'error-prone',
    // }),
  }),
});

export const {
  //   useAddPostMutation,
  //   useDeletePostMutation,
  useGetIssueQuery,
  useGetIssuesQuery,
  //   useLoginMutation,
  //   useUpdatePostMutation,
  //   useGetErrorProneQuery,
} = issuesApi;

export const {
  //   endpoints: { login, getPost },
  endpoints: { getIssue },
} = issuesApi;
