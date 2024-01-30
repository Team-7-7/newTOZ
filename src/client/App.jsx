import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import About from './About';
import Admin from './Admin';
import Footer from './Footer';
import Game from './Game';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Navigation from './Navigation';
import PhaserGame from './PhaserGame';
import Profile from './Profile';
import Register from './Register';
import CharacterSelection from './CharacterSelection';

import { useDispatch } from 'react-redux';
import { preloadGear } from './redux/thunks/gearThunks';
import { getMeThunk } from './redux/thunks/authThunks';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(preloadGear());
    const token = localStorage.getItem("TOKEN")
    if (token) dispatch(getMeThunk());
  }, [dispatch]);

  return (
    <>
      <section>

        <Routes>
          <Route id="main-section" path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/character' element={<CharacterSelection />} />
          <Route path='/game' element={<Game />} />
          <Route path='/header' element={<Header />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/navigation' element={<Navigation />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </section>

      <section id="game">
        <PhaserGame />
      </section>
      <section id="footer"> <Footer /> </section>
    </>
  );
}

export default App;

