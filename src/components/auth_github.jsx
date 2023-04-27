import { useEffect, useState } from 'react'
import supabase from '../supabaseClient'
import { useSelector, useDispatch } from 'react-redux'
import { authorize, deauthorize } from '../features/auth/authSlice'

function AuthGit() {
  const auth = useSelector(state => state.auth.value)
  const dispatch = useDispatch()
  const count = useSelector(state => state.counter.value)

  useEffect(() => {}, [])

  const signInWithGithub = async () => {
    const { user, session, error } = await supabase.auth
      .signInWithOAuth({
        provider: 'github',
      })
      .then(session => console.log(session))
      .catch(error => console.log(error))
  }

  const signOut = async () => {
    await supabase.auth.signOut().then(dispatch(deauthorize()))
  }

  return (
    <>
      <h1>test</h1>
      !auth: {!auth && 'unauthorized'}
      {count}
      {auth !== true && (
        <button onClick={signInWithGithub}>Sign in with Github</button>
      )}
      {auth && <button onClick={signOut}>Sign out</button>}
    </>
  )
  // : (
  //   <>
  //     <div>Logged in!</div>
  //     <button onClick={signOut}>Sign out</button>
  //     auth: {auth === true && 'authorized'}
  //   </>
  // )
}

export default AuthGit
