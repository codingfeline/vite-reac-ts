import axios from 'axios'
import React, { useState } from 'react'

const SignIn2 = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4400/login', { email, password })
      console.log(response.data)
    } catch (error) {
      console.error(error.response.data.error)
      setError(error.response.data.error)
    }
  }

  return (
    <>
      <div>signIn2</div>
      <form action="">
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" onChange={e => setEmail(e.target.value)} />
          {email}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>SignIn</button>
      </form>
      {error && <p>error: {error}</p>}
    </>
  )
}

export default SignIn2
