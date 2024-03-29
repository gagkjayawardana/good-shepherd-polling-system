import { createSlice } from '@reduxjs/toolkit';

export const voteSlice = createSlice({
  name: 'votes',
  initialState: {
    votes: []
  },
  reducers: {
    addVoteAction: () => {},
    getVotesAction: () => {},
    saveVoteAction: (state, action) => {
      state.votes = action.payload;
    }
  }
});

export const { addVoteAction, getVotesAction, saveVoteAction } = voteSlice.actions;

//selectors
export const selectVotes = (state) => state.voteReducer.votes;
//reducers
const voteReducer = voteSlice.reducer;
export default voteReducer;
