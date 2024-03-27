import { call, put, takeEvery } from 'redux-saga/effects';
import { addVoteService, getVoteService } from './voteService';
import { addVoteAction, getVotesAction, saveVoteAction } from './voteSlice';

function* addVoteGenerator({ payload }) {
  try {
    const response = yield call(addVoteService, payload);
    if (response.data.err === 'You have already voted.') {
      alert('You have aleady voted');
    } else {
      yield put(getVotesAction());
    }
  } catch (err) {
    alert('Vote not added');
  }
}

function* getVotesGenerator() {
  try {
    const response = yield call(getVoteService);
    if (response) {
      yield put(saveVoteAction(response));
    }
  } catch (err) {
    console.log(err);
  }
}

function* allVotes() {
  yield takeEvery(addVoteAction, addVoteGenerator);
  yield takeEvery(getVotesAction, getVotesGenerator);
}

export default allVotes;
