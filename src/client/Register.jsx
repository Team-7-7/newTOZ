import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { setToken } from './reducers/registrationSlice';


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);


  const handleRegistration = async (e) => {
    try {
      const { data: token } = await axios.post("/auth/register", {
        username,
        password,
        email,
      })
      localStorage.setItem("TOKEN", token.token)
      dispatch(setToken(token.token))

      // AFTER REGISTRATION NAVIGATE TO 'CHOOSE YOUR CHARACTER PAGE' //
      token.token? navigate('../character') : window.alert("Registration Failed")
    }
    catch (error) {
      console.error(error)
    }
  }


  return (
    <section
    id="main"
    > 
      <h1>Register</h1>
      
        <input type="text" placeholder="username" required value={username} onChange={(e) => setUsername(e.target.value)}></input><br />
        <input type="password" placeholder="password (min 7 char)" minlength="7" required value={password} onChange={(e) => setPassword(e.target.value)}></input><br />
        <input type="email" placeholder="email (optional)" value={email} onChange={(e) => setEmail(e.target.value)}></input><br />
        <input type="submit" value="Register" onClick={handleRegistration} />
      
      <h3>Option back to Login</h3>
      <button onClick={(e) => navigate('../login')}>Already registered? Login</button>
    </section>
  )
}

export default Register;
