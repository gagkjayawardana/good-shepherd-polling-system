import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: []
  },
  reducers: {
    loginUserAction: () => {},
    getUserAction: () => {},
    saveUserAction: (state, action) => {
      state.user = action.payload;
    },
    logoutUserAction: () => {},
    refreshAction: () => {}
  }
});

export const { loginUserAction, getUserAction, saveUserAction, logoutUserAction, refreshAction } =
  userSlice.actions;

//selectors
export const selectUser = (state) => state.userReducer.user;

//reducers
const userReducer = userSlice.reducer;
export default userReducer;
