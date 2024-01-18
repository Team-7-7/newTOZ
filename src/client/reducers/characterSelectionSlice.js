import { createSlice } from "@reduxjs/toolkit";

export const characterSelectionSlice = createSlice({
  name: 'userCharacter',
  initialState: {
    character: null
  },
  reducers: {
    setUserCharacter: (state, action) => {
      state.userCharacter = action.payload;
    },

    removeUserCharacter: (state) => {
      state.userCharacter = null;
    }
  }
});

export const { setUserCharacter, removeUserCharacter } = characterSelectionSlice.actions

export default characterSelectionSlice.reducer

