import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Awe, down, up } from './icons'
import supabase from '../supabaseClient'
import { useSelector, useDispatch } from 'react-redux'
import { authorize, deauthorize } from '../features/auth/authSlice'

const Navbar = () => {
  const auth = useSelector(state => state.auth.value)
  const [collapse, setCollapse] = useState(true)
  const dispatch = useDispatch()
  const [session, setSession] = useState(null)

  const links = [
    { item: 'Home', to: '/' },
    { item: 'About', to: '/about' },
    { item: 'Auth', to: '/auth' },
    { item: 'AuthGit', to: '/authGit' },
    { item: 'Restaurants', to: '/restaurants' },
  ]

  const toggle = () => {
    setCollapse(!collapse)
  }
  useEffect(() => {
    console.log('value of auth b4', auth)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) dispatch(authorize())
      setSession(session)
      console.log('session', new Date(), session)
      console.log('value of auth after', auth)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [auth])

  return (
    <div>
      <div className="flex justify-center">
        {collapse ? (
          <a
            href="#"
            className="cursor-pointer hover:text-blue-800 block w-full hover:bg-blue-100"
          >
            <Awe icon={down} size="3x" onClick={toggle} className="w-full" />
          </a>
        ) : (
          <a
            href="#"
            className="cursor-pointer hover:text-blue-800 block w-full hover:bg-blue-100"
          >
            <Awe icon={up} size="3x" onClick={toggle} className="w-full" />
          </a>
        )}{' '}
      </div>
      <ul
        className={`sm:grid sm:grid-cols-5 border-2 bg-red-200
        ${
          collapse
            ? // prettier-ignore
              'border-red-400 hidden'
            : 'border-blue-400  sm:grid sm:grid-cols-5'
        }
        `}
      >
        {links.map(link => (
          <li key={link.item}>
            <Link
              onClick={toggle}
              className="z-60 block bg-slate-100 hover:bg-slate-200 p-2 sm:p-5 text-center"
              to={link.to}
            >
              {link.item}
            </Link>
          </li>
        ))}
      </ul>

      {`auth: ${auth}`}
    </div>
  )
}

export default Navbar
