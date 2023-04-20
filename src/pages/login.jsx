// import { createClient } from "@supabase/supabase-js"
import { Auth } from '@supabase/auth-ui-react'
import supabase from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
  // const navigate = useNavigate()

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange(async event => {
  //     if (event == 'SIGNED_IN') {
  //       navigate('/success')
  //     } else {
  //       navigate('/')
  //     }
  //   })
  // })

  return (
    <div>
      <h1>Login</h1>
      <Auth
        supabaseClient={supabase}
        // appearance={''}
        // theme="dark"
        providers={['github']}
      />
    </div>
  )
}

export default Login
