import { Link } from 'react-router-dom';

const Navigation = () => {

  return (
    <>
      Navbar for Dev:
      <Link className="nav" to="/login">Login</Link>
      <Link className="nav" to="/register">Register</Link>
      <Link className="nav" to="/profile">Profile</Link>
      <Link className="nav" to="/admin">Admin</Link>
      <Link className="nav" to="/game">Game</Link>
      <Link className="nav" to="/home">Home</Link>
    </>
  )
}

export default Navigation;