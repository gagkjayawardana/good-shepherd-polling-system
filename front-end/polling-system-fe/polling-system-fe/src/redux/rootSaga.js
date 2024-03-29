import userSaga from './user/userSaga';
import eventSaga from './event/eventSaga';
import voteSaga from './vote/voteSaga';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(eventSaga), fork(voteSaga)]);
}
