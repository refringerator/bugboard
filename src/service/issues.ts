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
    // TODO: нужна ли тут мутация для ртк-квери?
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
        ...result.map(({ number }) => ({ type: 'Issues', number }) as const),
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
      query: (number) => `repos/refringerator/bugboard/issues/${number}`,
      providesTags: (_issue, _err, number) => [{ type: 'Issues', number }],
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
      invalidatesTags: (issue) => [{ type: 'Issues', number: issue?.number }],
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
  useUserMutation,
  useUpdateIssueMutation,
  //   useGetErrorProneQuery,
} = issuesApi;

export const {
  //   endpoints: { login, getPost },
  endpoints: { getIssue, user },
} = issuesApi;
