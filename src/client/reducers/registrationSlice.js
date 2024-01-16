import { createSlice } from "@reduxjs/toolkit";

export const registrationSlice = createSlice({
  name: 'token',
  initialState: {
    token: null
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    }
  }
});

export const { setToken, removeToken } = registrationSlice.actions

export default registrationSlice.reducer

