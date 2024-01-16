import { useSelector } from 'react-redux'

const CharacterSelection = () => {
  // registration page leads here.
  // TODO logic and state 
  const token = useSelector(state => state.token.token)

  return (
    <>
    <h1>Character Selection</h1>
    <h2>[] Warrior</h2>
    <h2>[] Mage</h2>
    <h2>[] Kung-Fu Master</h2>
    Token in Redux State test:
    <h8>{token}</h8>
    </>
  )
}

export default CharacterSelection;