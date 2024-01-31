import { call, put, takeLatest } from 'redux-saga/effects';
import APIGetToken from 'src/api/getToken';

function* getToken(action) {
  try {
    const token = yield call(APIGetToken, action.payload.code);
    yield put({ type: 'TOKEN_GET_SUCCEEDED', token });
  } catch (e) {
    yield put({ type: 'TOKEN_GET_ERROR', message: e.message });
  }
}

function* mySaga() {
  yield takeLatest('TOKEN_GET_REQUESTED', getToken);
}

export default mySaga;
