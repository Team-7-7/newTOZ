import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: 'user',
  initialState: {
    userRecord: null
  },
  reducers: {
    setUser: (state, action) => {
      state.userRecord = action.payload;
    },
    removeUser: (state) => {
      state.userRecord = null;
    }
  }
});

export const { setUser, removeUser } = loginSlice.actions

export default loginSlice.reducer

