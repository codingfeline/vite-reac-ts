import React, { useEffect, useState } from 'react'
import supabase from '../supabaseClient'

const Success = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then(value => {
        if (value.data?.user) {
          setUser(value.data.user)
          console.log(user)
        }
      })
    }
    getUserData()
  }, [])

  return (
    <div>
      <h1>Success</h1>
    </div>
  )
}

export default Success
