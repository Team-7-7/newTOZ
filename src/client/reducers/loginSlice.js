import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: 'user',
  initialState: {
    value: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    }
  }
});

export const { setUser, removeUser } = loginSlice.actions

export default loginSlice.reducer

