import axios from 'axios';
import { removeUserCharacter, setUserCharacter } from '../../reducers/characterSelectionSlice';
import { removeToken, setToken } from '../../reducers/registrationSlice';
import { setUser, removeUser } from '../../reducers/loginSlice';
import { addItemToInventory, removeAllGear } from '../../reducers/gearSlice';

export const loginThunk = (username, password, navigate) => async (dispatch, getState) => {
  try {
    //wipe state slate upon login//
    dispatch(removeAllGear())
    dispatch(removeUser())
    dispatch(removeUserCharacter())
    dispatch(removeToken())
    ///////////////////////////////


    const { data: loginResponse } = await axios.post("/auth/login", {
        username,
        password,
    });

    localStorage.setItem("TOKEN", JSON.stringify(loginResponse.token));
    const userId = loginResponse.id;

    dispatch(setToken(loginResponse.token));
    dispatch(setUser({ id: userId }));

    // Get User Record from DB and set it in state
    const { data: userRecord } = await axios.get(`/api/user/${userId}`);
    dispatch(removeUser());  // Clears User data out of state if already there
    dispatch(setUser(userRecord));
    console.log("user record set up in redux state");

    // If no character is associated with the user yet, take them to the character selection page
    if (!userRecord.character_id) { 
        console.log("Navigate to character selection page");
        navigate('/character');
    }

    // Load up character information into state
    const { data: characterRecord } = await axios.get(`/api/character/${userRecord.character_id}`);
    dispatch(setUserCharacter(characterRecord));
    // localStorage.setItem("CHARACTER", JSON.stringify(characterRecord)); // Possible security issue to put in state
    console.log("character record set up in redux state");

    // Load up inventory into state
    const { data: userInventory } = await axios.get(`/api/inventory/${userRecord.character_id}`);
    console.log("UserInventory : ", userInventory)
    userInventory.forEach( async (gearItem) => {
      const { data: gearDetails } = await axios.get(`/api/gear/${gearItem.gear_id}`)
      dispatch(addItemToInventory(gearDetails))
      console.log(gearDetails.name, "added to Inventory in State")
    });

    console.log("login and character load up a SUCCESS");

    // You can add additional logic here based on the success of the login
    // For example, navigate to the game page or display an alert
    if (loginResponse) {
      console.log("Officially thunked. Navigate to the game page");
      navigate('/game')
    } else {
        window.alert("Login Error");
    }
} catch (error) {
    console.error(error);
}
};


export const getMeThunk = () => async (dispatch) => {
    try{
      let token = localStorage.getItem("TOKEN")
      console.log("I am in the getMeThunk and have this token; ", token)
      token = token.slice(1,-1);
      const { data: userRecord } = await axios.get("/api/user/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(userRecord)
      //wipe state slate upon token-login//
      dispatch(removeUser())
      dispatch(removeUserCharacter())
      dispatch(removeAllGear())
      //set data in redux state
      dispatch(setToken(token));
      dispatch(setUser(userRecord)); 
      const { data: characterRecord } = await axios.get(`/api/character/${userRecord.character_id}`);
      dispatch(setUserCharacter(characterRecord));
      //no longer need inventory list, now using character record backpack items in DB
    }
    catch (error) { console.error(error) }
  };