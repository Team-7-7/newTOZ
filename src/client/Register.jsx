import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Register</h1>
      <h2>Registration form goes here</h2>
      <form>
        <input type="text" defaultValue="username"></input>
        <input type="submit" value="Register"/>
      </form>
      <h3>Option back to Login</h3>
      <button onClick={(e) => navigate('../login')}>Already registered? Login</button>
    </>
  )
}

export default Register;
