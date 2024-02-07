import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

type TWindowState = {
  id: string;
  width?: number;
  height?: number;
  startX?: number;
  startY?: number;
  position?: { x: number; y: number };
};

const initialState: TWindowState[] = [];

export const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<TWindowState>) => [
      ...state.filter((window) => window.id !== action.payload.id),
      action.payload,
    ],
  },
});

// Action creators are generated for each case reducer function
export const { set: setWindowStateAction } = windowsSlice.actions;

export const windowsSelectors = {
  get: (state: RootState): RootState['windows'] => {
    return state.windows;
  },
};

export default windowsSlice.reducer;
