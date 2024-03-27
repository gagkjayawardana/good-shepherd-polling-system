import { call, put, takeEvery } from 'redux-saga/effects';
import { addVoteService, getVoteService } from './voteService';
import { addVoteAction, getVotesAction, saveVoteAction } from './voteSlice';

import { io } from 'socket.io-client';
const socket = io('http://localhost:8000/', {
  transports: ['websocket']
});

function* addVoteGenerator({ payload }) {
  try {
    const response = yield call(addVoteService, payload);
    if (response.data.err === 'You have already voted.') {
      alert('You have aleady voted');
    } else {
      socket.emit('vote_add', `Vote Added`);
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
