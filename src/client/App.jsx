import { Route, Routes } from 'react-router-dom';
import About from './About';
import Admin from './Admin';
import Footer from './Footer';
import Game from './Game';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Navigation from './Navigation';
import Profile from './Profile';
import Register from './Register';
import CharacterSelection from './CharacterSelection';

const App = () => {



  return (
    <>
      <section id="header"> <Header /> </section>

      <section id="navigation"> <Navigation /> </section>

      {/* <section id="main" > */}
      <section>

        <Routes>
          <Route id="main-section" path='/' element={<Home />}  />
          <Route path='/about' element={<About/>} id="main-section" />
          <Route path='/admin' element={<Admin />} id="main-section"/>
          <Route path='/character' element={<CharacterSelection className="main-section"/>} />
          <Route path='/game' element={<Game />} id="excludeGame"/>
          <Route path='/header' element={<Header />} className="main-section"/>
          <Route path='/home' element={<Home />} id="main-section"/>
          <Route path='/login' element={<Login />} className="main-section"/>
          <Route path='/navigation' element={<Navigation className="main-section"/>} />
          <Route path='/profile' element={<Profile />} id="main-section"/>
          <Route path='/register' element={<Register />} className="main-section"/>
        </Routes>
      </section>
      
      <section id="footer"> <Footer /> </section>
    </>
  );
}

export default App;

