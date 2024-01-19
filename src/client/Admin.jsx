import { useSelector } from 'react-redux'

const Admin = () => {

  const token = useSelector(state => state.token.token)
  const user = useSelector(state => state.user.userRecord)
  const character = useSelector(state => state.userCharacter.character)

  return (
    <section
    id="main"
    > 
    <h1>Admin</h1>
    <h1>check to see if admin for access</h1>
    <h1>Stuff in Redux State</h1>
    {token ? <p>TOKEN: {token}</p> : null}
    {user? <p>USER: {user.username}...and more in the object! SUCCESS!</p> : null}
    {character? <p>Character: {character.name}...and more in the object! SUCCESS!</p> : null}
    </section>
  )
}

export default Admin;