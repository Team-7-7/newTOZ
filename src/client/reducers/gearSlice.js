import { createSlice } from "@reduxjs/toolkit";

export const gearSlice = createSlice({
  name: 'gear',
  initialState: {
    inventory: [],
    allPossibleGear: {},
  },
  reducers: {
    setAllGear: (state, action) => {
      state.inventory = action.payload;
    },

    addItemToInventory:  (state, action) => {
      state.inventory = [...state.inventory, action.payload];
    },

    //takes in the gear id and removes that item from state
    removeItemFromInventory:  (state, action) => {
      const gearId = action.payload; 
      const gearIndex = state.inventory.findIndex((item) => item.gear_id === gearId) //if multiple fo the same item in inventory makes sure that only one is deleted
      if (gearIndex) {
      state.inventory.splice(gearIndex,1)
      }
    },

    removeAllGear: (state) => {
      state.inventory = [];
    },

    //stores all gear listings from the DB
    setAllPossibleGear: (state, action) => {
      state.allPossibleGear = action.payload;
    },
  }
});

export const { setAllGear, removeAllGear, addItemToInventory, removeItemFromInventory, setAllPossibleGear } = gearSlice.actions

export default gearSlice.reducer

