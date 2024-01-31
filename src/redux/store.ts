import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import tokenSaga from './token/saga';
import helloSaga from './saga/hello';

import counterReducer from './counterSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(tokenSaga);
sagaMiddleware.run(helloSaga);

// Удалить потом, пример из туториала
// export const action = (type: string) => store.dispatch({ type });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
