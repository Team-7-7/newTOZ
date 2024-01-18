import { configureStore } from '@reduxjs/toolkit'
import registrationReducer from './reducers/registrationSlice';
import characterSelectionReducer from './reducers/characterSelectionSlice';
import loginReducer from './reducers/loginSlice';

export const store = configureStore({
  reducer: {
    token: registrationReducer,
    user: loginReducer,
    userCharacter: characterSelectionReducer
  },
})

