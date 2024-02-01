import { put, takeEvery } from 'redux-saga/effects';

// eslint-disable-next-line no-promise-executor-return
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'counter/increment' });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}
