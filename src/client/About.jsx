import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <h1>About</h1>
      <p>Capstone project with FullStack Academy's Web Development Bootcamp Jan-Feb 2024</p>
      <p>Inspired by 8-Bit RPG adventures like the original Nintendo Enternainment System's Legend of Zelda, we are introducing a game called...</p>
      <h2>The Tower of Zarpulen</h2>
      <p>The princess has been captured by the evil wizard Zurpalen. The kindom is in disarray.</p>
      <p>Choose to be a warrior, a mage, or a rogue, each with their own unique strengths and weaknesses,
        in your quest to save the princess from the wizard’s tower, before chaos reigns eternal.  </p>

      <p>Can you make your way up through each floor of the tower to face Zurpalen?</p>

      <p>The journey will be difficult, heroes have entered, but none have returned... </p>

      <h3> Coding, Design & Story:</h3>
      <ul>
        <li>- Salvador Carrazco -</li>
        <li>- Nick Golebiewski -</li>
        <li>- Joel Pickler -</li>
        <li>- Taggart Salcedo -</li>
      </ul>
      <Link className="nav" to="/game">Back to Game</Link>
    </>
  )
}

export default About;