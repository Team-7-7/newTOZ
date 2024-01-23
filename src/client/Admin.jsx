import { useSelector } from 'react-redux'

const Admin = () => {

  const token = useSelector(state => state.token.token)
  const user = useSelector(state => state.user.userRecord)
  const character = useSelector(state => state.userCharacter.character)
  const gear = useSelector(state => state.gear.inventory)

  return (
    <section
    id="main"
    > 
    <h1>Admin</h1>
    <h1>check to see if admin for access</h1>
    <h1>Stuff in Redux State</h1>
    {token ? <p>TOKEN: {token}</p> : null}
    {user? <p>USER: {user.username}</p> : null}
    {character? <p>Character: {character.name} the {character.character_class}</p> : null}
    {gear.length > 0? <div>Inventory: <ol>{gear.map((item) => <li>{item.name}</li>) }</ol></div> : null}
    </section>
  )
}

export default Admin;