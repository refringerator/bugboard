import { createSlice } from '@reduxjs/toolkit';
import { issuesApi } from 'src/service/issues';
import type { User } from 'src/service/issues';
import type { RootState } from './store';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
} as { user: null | User; token: string | null; isAuthenticated: boolean };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(issuesApi.endpoints.user.matchPending, (_state, action) => {
        console.log('pending', action);
      })
      .addMatcher(issuesApi.endpoints.user.matchFulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.user = { login: action.payload.login, id: action.payload.id };
        state.isAuthenticated = true;
      })
      .addMatcher(issuesApi.endpoints.user.matchRejected, (_state, action) => {
        console.log('rejected', action);
      });
  },
});

export const { logout, setToken } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
