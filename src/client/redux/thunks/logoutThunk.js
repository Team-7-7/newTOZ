import axios from 'axios';
import { removeUserCharacter, setUserCharacter } from '../../reducers/characterSelectionSlice';
import { removeToken, setToken } from '../../reducers/registrationSlice';
import { setUser, removeUser } from '../../reducers/loginSlice';
import { addItemToInventory, removeAllGear } from '../../reducers/gearSlice';

export const logoutThunk = () => async (dispatch) => {
  try {
    //remove all user data from REDUX state
    dispatch(removeAllGear())
    dispatch(removeUser())
    dispatch(removeUserCharacter())
    dispatch(removeToken())

    //remove user token from Local Storage
    localStorage.removeItem("TOKEN")
    
    console.log("all user data removed from state and local storage")
} catch (error) {
    console.error(error);
}
};

export const logoutThunkPhaser = () => async (dispatch) => {
  try {
    //remove all user data from REDUX state
    store.dispatch(removeAllGear())
    store.dispatch(removeUser())
    store.dispatch(removeUserCharacter())
    store.dispatch(removeToken())

    //remove user token from Local Storage
    localStorage.removeItem("TOKEN")
    
    console.log("all user data removed from state and local storage")
} catch (error) {
    console.error(error);
}
};