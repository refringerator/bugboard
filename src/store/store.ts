import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  ThunkAction,
  ThunkDispatch,
  UnknownAction,
  configureStore,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { api } from 'src/service/api';
import {
  counterReducer,
  windowsReducer,
  authReducer,
  settingsReducer,
} from 'src/store';

// Должна быть только одна корневая сага
import rootSaga from './saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    counter: counterReducer,
    windows: windowsReducer,
    auth: authReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware).concat(api.middleware),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// Дополнительные типы, чтобы можно было диспатчить Thunk`и
// https://github.com/reduxjs/redux-toolkit/issues/587#issuecomment-1049488808
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypedDispatch = ThunkDispatch<RootState, any, UnknownAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
