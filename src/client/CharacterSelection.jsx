import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import "./characterselection.css";
import { setUserCharacter } from './reducers/characterSelectionSlice';
import { setUser, removeUser} from './reducers/loginSlice';

const CharacterSelection = () => {
  const [characterName, setCharacterName] = useState('');
  const [characterClasses, setCharacterClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(state => state.token.token)
  const user = useSelector(state => state.user.userRecord)

  if (user) {
    const { id } = user;
    console.log('user.id', id, 'user', user)
  }

  useEffect(() => {
    const getCharacterClasses = async () => {
      try {
        const { data } = await axios.get(`/api/characterclass`);
        console.log(data);
        setCharacterClasses(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCharacterClasses();
  }, []);

  const handleOptionChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  console.log('Character Name:', characterName);
  console.log('Selected Class:', selectedClass);

  //create new character in DB for the user
    //grab info for specific warrior
    const classIndex = parseInt(selectedClass) - 1  // subtract one from the id to sync up with the character class array index
    const { name, beginning_attack, beginning_armor, beginning_speed, beginning_hp, graphicUrl } = characterClasses[classIndex];
    const userID = user.id     
    
    //create new character in DB
    try{
    const newCharacter = await axios.post('/api/character',{
      name: characterName,
      gender: "nonbinary",
      character_class: name,
      currentHP: beginning_hp,
      maxHP: beginning_hp,
      xp: 0,
      level: 1,
      graphicUrl,
      gold:10,
      base_attack:beginning_attack,
      base_armor:beginning_armor,
      base_speed:beginning_speed,
      stagescompleted:0
    })
    console.log(newCharacter.data)

    //push character info to redux state
    dispatch(setUserCharacter(newCharacter.data))

    //connect character ID onto user record
    const { data: updateUserWithCharacterId } = await axios.patch('/api/user', {
      character_id: +newCharacter.data.id,
      id: +userID
    })

    dispatch(removeUser())
    dispatch(setUser(updateUserWithCharacterId))

      //**************************** 
    //TODO: phase 2 create an inventory# on character db record 
    //**************************** 

    console.log('done!')
    // navigate('/game')
    if (updateUserWithCharacterId) {navigate('/game')}
    else window.alert("Registration Failed")

  
  } catch(error){
    console.error(error)
  }
  };


  return (
    !user ? (
      <h1>Not logged in</h1>
    ) : 
    (
      <>
        <h1>Character Selection</h1>
        <h1>{user.username}, Name your Character</h1>
        <form id="char-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Character Name"
            required
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
          />
          <br />
          <h1>Choose your Character Class</h1>
          {characterClasses ? (
            characterClasses.map((archetype) => (
              <div key={archetype.id} className="radio-boxes">
                <input
                  type="radio"
                  id={`character-${archetype.id}`}
                  name="classes"
                  value={archetype.id}
                  onChange={handleOptionChange}
                />
                <label htmlFor={`character-${archetype.id}`}>{archetype.name.toUpperCase()}</label>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}

          <button type="submit">Submit</button>
        </form>

      </>
    )
  );
}

export default CharacterSelection;