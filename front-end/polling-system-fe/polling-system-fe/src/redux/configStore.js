import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './user/userSlice';
import rootSaga from './rootSaga';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userReducer: userReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    }).concat(saga);
  }
});

saga.run(rootSaga);

export default store;
