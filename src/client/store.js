import { configureStore } from '@reduxjs/toolkit'
import registrationReducer from './reducers/registrationSlice';

export const store = configureStore({
  reducer: {
    token: registrationReducer
  },
})

