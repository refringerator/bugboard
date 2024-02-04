// import { retry } from '@reduxjs/toolkit/query/react';
import { api } from './api';

export interface User {
  login: string;
  id: number;
}

// TODO: добавить в задачу самого пользователя
export interface Issue {
  id: number;
  number: number;
  title: string;
  body_text: string;
  body: string;
  url: string;
  state: string;
  created_at: string;
  updated_at: string;
}

type IssuesResponse = Issue[];

export const issuesApi = api.injectEndpoints({
  endpoints: (build) => ({
    user: build.mutation({
      query: () => ({
        url: 'user',
        method: 'GET',
      }),
      // extraOptions: {
      //   backoff: () => {
      //     // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
      //     retry.fail({ fake: 'error' });
      //   },
      // },
    }),
    getIssues: build.query<IssuesResponse, void>({
      query: () => ({ url: 'repos/refringerator/bugboard/issues' }),
      providesTags: (result = []) => [
        ...result.map(
          ({ number }) => ({ type: 'Issues', id: number }) as const
        ),
        { type: 'Issues' as const, id: 'LIST' },
      ],
    }),
    addIssue: build.mutation<Issue, Partial<Issue>>({
      query: (body) => ({
        url: 'repos/refringerator/bugboard/issues',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Issues', id: 'LIST' }],
    }),
    getIssue: build.query<Issue, number>({
      query: (number) => `repos/refringerator/bugboard/issues/${number}`,
      providesTags: (_issue, _err, number) => [{ type: 'Issues', id: number }],
    }),
    updateIssue: build.mutation<Issue, Partial<Issue>>({
      query(data) {
        const { number, ...body } = data;
        return {
          url: `repos/refringerator/bugboard/issues/${number}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: (issue) => [{ type: 'Issues', id: issue?.number }],
      // extraOptions: {
      //   backoff: () => {
      //     // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
      //     retry.fail({ fake: 'error' });
      //   },
      // },
    }),
    // deletePost: build.mutation<{ success: boolean; id: number }, number>({
    //   query(id) {
    //     return {
    //       url: `posts/${id}`,
    //       method: 'DELETE',
    //     };
    //   },
    //   invalidatesTags: (post) => [{ type: 'Posts', id: post?.id }],
    // }),
  }),
});

export const {
  useAddIssueMutation,
  //   useDeletePostMutation,
  useGetIssueQuery,
  useLazyGetIssueQuery,
  useGetIssuesQuery,
  useUserMutation,
  useUpdateIssueMutation,
} = issuesApi;

export const {
  endpoints: { getIssue, user },
} = issuesApi;
