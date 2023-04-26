import { useEffect, useState } from 'react'
// import './App.css'
import supabase from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSelector, useDispatch } from 'react-redux'
import { authorize, deauthorize } from '../features/auth/authSlice'

function AuthBox() {
  const auth = useSelector(state => state.auth.value)
  const dispatch = useDispatch()
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) dispatch(authorize())
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    dispatch(deauthorize())
  }

  return !session ? (
    <>
      <h2 className="">Signin</h2>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['github', 'google']}
      />
      !auth: {!auth && 'unauthorized'}
      {typeof auth}
    </>
  ) : (
    <>
      <div>Logged in!</div>
      <button onClick={signOut}>Sign out</button>
      auth: {auth === true && 'authorized'}
    </>
  )
}

export default AuthBox
