import { call, put, takeEvery } from 'redux-saga/effects';
import {
  createEventService,
  deleteEventService,
  getEventService,
  updateEventService
} from './eventService';
import {
  createEventAction,
  deleteEventAction,
  getEventAction,
  saveEventAction,
  updateEventAction
} from './eventSlice';
import { saveVoteAction } from '../vote/voteSlice';

function* createEventGenerator({ payload }) {
  try {
    const response = yield call(createEventService, payload);
    if (response) {
      yield put(saveEventAction(response.data));
    }
  } catch (err) {
    alert('Event not create');
  }
}

function* getEventGenerator() {
  try {
    const response = yield call(getEventService);
    if (response) {
      yield put(saveEventAction(response));
    }
  } catch (err) {
    console.log(err);
  }
}

function* updateEventGenerator({ payload }) {
  try {
    const response = yield call(updateEventService, payload);
    if (response) {
      yield put(saveEventAction(response.data));
    }
  } catch (err) {
    alert('Status not updated');
  }
}

function* deleteEventGenerator() {
  try {
    const response = yield call(deleteEventService);
    if (response) {
      yield put(saveEventAction(response.data));
      yield put(saveVoteAction(response.data));
    }
  } catch (err) {
    alert('Event not deleted');
  }
}

function* allEvents() {
  yield takeEvery(createEventAction, createEventGenerator);
  yield takeEvery(getEventAction, getEventGenerator);
  yield takeEvery(updateEventAction, updateEventGenerator);
  yield takeEvery(deleteEventAction, deleteEventGenerator);
}

export default allEvents;
