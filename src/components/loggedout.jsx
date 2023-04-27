import { Link } from 'react-router-dom'

const Loggedout = () => {
  return (
    <>
      <div>You have logged out successfully.</div>
      <Link to={'/'}>home</Link>
    </>
  )
}

export default Loggedout
