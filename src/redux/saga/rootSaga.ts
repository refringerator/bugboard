import { all } from 'redux-saga/effects';

import helloSaga from './hello';
import { watchIncrementAsync } from './counterSaga';

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
