import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from 'src/redux/store';

const tokenSlice = createSlice({
  name: 'token',
  initialState: localStorage.getItem('token'),
  reducers: {
    set: (_, action: PayloadAction<string>) => action.payload,
    reset: () => null,
  },
});

// const tokenActions = tokenSlice.actions;

// const resetTokenThunk = (): AppThunk => (dispatch) => {
//   dispatch(tokenActions.reset());
//   localStorage.removeItem('token');
// };

// const setTokenThunk =
//   (token: string): AppThunk =>
//   (dispatch) => {
//     dispatch(tokenActions.set(token));
//     // const { token } = getState();
//     localStorage.setItem('token', token);
//   };

// export const tokenThunks = {
//   resetTokenThunk,
//   // setTokenThunk,
// };

// export const tokenSelectors = {
//   get: (state: RootState): RootState['token'] => state.token,
// };

export default tokenSlice.reducer;
