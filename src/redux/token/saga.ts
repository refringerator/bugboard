import { call, put, takeLatest } from 'redux-saga/effects';
import APIGetToken from 'src/api/getToken';

function* getToken() {
  // function* getToken(action) {
  try {
    const token: string = yield call(APIGetToken, '123');
    // const token = yield call(APIGetToken, action.payload.code);
    yield put({ type: 'TOKEN_GET_SUCCEEDED', token });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    yield put({ type: 'TOKEN_GET_ERROR', message: e.message });
  }
}

function* mySaga() {
  yield takeLatest('TOKEN_GET_REQUESTED', getToken);
}

export default mySaga;
