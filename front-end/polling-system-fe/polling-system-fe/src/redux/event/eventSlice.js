import { createSlice } from '@reduxjs/toolkit';

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    event: []
  },
  reducers: {
    createEventAction: () => {},
    updateEventAction: () => {},
    getEventAction: () => {},
    saveEventAction: (state, action) => {
      state.event = action.payload;
    },
    deleteEventAction: () => {}
  }
});

export const {
  createEventAction,
  updateEventAction,
  getEventAction,
  saveEventAction,
  deleteEventAction
} = eventSlice.actions;

//selectors
export const selectEvent = (state) => state.eventReducer.event;

//reducers
const eventReducer = eventSlice.reducer;
export default eventReducer;
