import axios from 'axios'
import React, { useState, useEffect } from 'react'

const SignIn2 = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [token, setToken] = useState('')
  const [profile, setProfile] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  const handleLogin = async e => {
    e.preventDefault()
    setError('')
    setToken('')
    try {
      const response = await axios.post('http://localhost:4400/login', { email, password })
      // console.log(response.data.data)
      // console.log(response.data.data.session.access_token)
      setToken(response.data.data.session.access_token)
      setUserInfo(response.data.data.user)
    } catch (error) {
      console.error(error.response)
      setError(error.response.data.error)
    }
  }

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:4400/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setProfile(response)
    } catch (error) {
      console.error(error.response.data.error)
      setError(error.response)
    }
  }

  useEffect(() => {
    if (token) {
      fetchProfile()
    }
  }, [token])

  return (
    <>
      <div>signIn2</div>
      {profile ? (
        <div>
          <h2>Welcome, {email}!</h2>
          <p>User ID: {}</p>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
      {error && <p>error: {error}</p>}
      {token && JSON.stringify(token)}
      {profile ? JSON.stringify(profile) : error}
      user: {userInfo && JSON.stringify(userInfo)}
    </>
  )
}

export default SignIn2
