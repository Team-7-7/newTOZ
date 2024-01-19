import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setToken } from './reducers/registrationSlice';
import { removeUser, setUser } from './reducers/loginSlice';
import { setUserCharacter } from './reducers/characterSelectionSlice';


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password)
    try {
      const { data: token } = await axios.post("/auth/login", {
        username,
        password,
      })
      localStorage.setItem("TOKEN", token)
      dispatch(setToken(token.token))
      console.log(token)

      const userId = token.id
      console.log(userId)
      dispatch(setUser({ id: userId }));


      //get User Record from DB and set it in state
      const { data: userRecord } = await axios.get(`/api/user/${userId}`);
      console.log(userRecord)
      dispatch(removeUser());  //Clears User data out of state if already there
      dispatch(setUser(userRecord));
      console.log("user record set up in redux state")

      // if no character is associated with the user yet, take them to the character selection page
      if (!userRecord.character_id) { navigate('/character') }

      //load up character information into state
      const { data: characterRecord } = await axios.get(`/api/character/${userRecord.character_id}`);
      console.log(characterRecord);
      dispatch(setUserCharacter(characterRecord));
      console.log("character record set up in redux state")

      // TO DO load up inventory into state
        // TO DO WRITE API for this

      console.log("login and character load up a SUCESSS")

      if (token) {
        navigate('/game')
      } else {
        window.alert("Login Error")
      }
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <section id="main">
      <h1>Login</h1>
      <form >
        <input type="text" placeholder="username" required value={username} onChange={(e) => setUsername(e.target.value)}></input><br />
        <input type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)}></input><br />
        <input type="submit" value="Login" onClick={handleLogin} />
      </form>
      <h3>Option to Register</h3>
      <button onClick={(e) => navigate('../register')}>Need to Register?</button>
    </section>
  )
}

export default Login;