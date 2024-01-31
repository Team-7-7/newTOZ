import { createSlice } from "@reduxjs/toolkit";

export const characterSelectionSlice = createSlice({
  name: 'userCharacter',
  initialState: {
    character: null,
    characterClasses: []
  },
  reducers: {
    setUserCharacter: (state, action) => {
      state.character = action.payload;
    },

    removeUserCharacter: (state) => {
      state.character = null;
    },

    setCharacterClasses: (state, action) => {
      state.characterClasses = action.payload;
    },

    removeCharacterClasses: (state) => {
      state.characterClasses = [];
    }
  }
});

export const { setUserCharacter, removeUserCharacter, setCharacterClasses, removeCharacterClasses } = characterSelectionSlice.actions

export default characterSelectionSlice.reducer

