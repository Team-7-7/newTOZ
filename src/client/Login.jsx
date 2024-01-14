import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate=useNavigate()
  return (
    <>
    <h1>Login</h1>
    <h2>Login form goes here</h2>
    <h3>Option to Register</h3>
    <button onClick={(e)=>navigate('../register')}>Need to Register?</button>
    </>
  )
}

export default Login;