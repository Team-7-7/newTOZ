import { Link } from 'react-router-dom';
import { logoutThunk } from './redux/thunks/logoutThunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutThunk());   
  };

  return (
    <div className="footer">
      <a id="fancy">Tower of Zurpalen </a>
      <a className="nav" href="https://github.com/Team-7-7/tower_of_zurpalen" target="_blank">Source code on GitHub</a>
      <Link className="nav" to="../about">About</Link>
      <Link className="nav" to="/login">Login</Link>
      <Link className="nav" to="/register">Register</Link>
      <Link className="nav" onClick={(e) => handleLogout()}>Logout</Link>
      <Link className="nav" to="/game">Hide Windows</Link>
    </div>
  )
}

export default Footer;