import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'src/store';

export interface SettingsState {
  dragAndDrop: boolean;
}

const initialState: SettingsState = {
  dragAndDrop: true,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDragAndDrop: (state, action: PayloadAction<boolean>) => {
      state.dragAndDrop = action.payload;
    },
  },
});

export const { setDragAndDrop } = settingsSlice.actions;
export default settingsSlice.reducer;

export const settingsSelectors = {
  getDragAndDrop: (state: RootState) => {
    return state.settings.dragAndDrop;
  },
};
