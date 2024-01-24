import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from './redux/thunks/authThunks';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password)
    dispatch(loginThunk(username, password, navigate));
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