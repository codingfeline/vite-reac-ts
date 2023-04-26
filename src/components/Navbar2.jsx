import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Awe, bars, xmark } from './icons'
import supabase from '../supabaseClient'
import { useSelector, useDispatch } from 'react-redux'
import { authorize, deauthorize } from '../features/auth/authSlice'

const Navbar2 = () => {
  const auth = useSelector(state => state.auth.value)
  const dispatch = useDispatch()
  const [hidden, setHidden] = useState(true)
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  const links = [
    { item: 'Home', to: '/' },
    { item: 'About', to: '/about' },
    { item: 'Restaurants', to: '/restaurants' },
  ]

  const toggle = () => {
    setHidden(!hidden)
  }
  const collapse = () => {
    setHidden(true)
  }
  const handleScroll = () => collapse()

  const signOut = async () => {
    await supabase.auth.signOut()
    dispatch(deauthorize())
    setHidden(true)
    navigate('/logout_success')
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

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

  return (
    <div className="">
      <div className="flex justify-center sm:justify-end">
        {hidden ? (
          <a
            href="#"
            className="cursor-pointer text-lime-800 block w-full hover:bg-lime-100 sm:flex sm:justify-center "
          >
            <Awe
              icon={bars}
              size="3x"
              onClick={toggle}
              className="w-full sm:hidden"
            />{' '}
          </a>
        ) : (
          <a
            href="#"
            className="cursor-pointer hover:text-lime-400 block w-full hover:bg-lime-100"
          >
            <Awe
              icon={xmark}
              size="3x"
              onClick={toggle}
              className="w-full z-200 absolute"
            />
          </a>
        )}
      </div>

      <div
        className={`duration-500 sm:static absolute bg-blue-100 sm:min-h-fit min-h-[100vh] left-0  sm:w-auto  w-full flex items-center justify-center sm:justify-end px-5 z-100
      ${!hidden ? 'top-[0%]' : 'top-[-100%]'}
      `}
      >
        <ul className="flex sm:flex-row flex-col  sm:items-center sm:gap-[0vw] gap-1 items-stretch">
          {links.map(link => (
            <li key={link.item} className="nav-li">
              <Link onClick={collapse} to={link.to} className="nav-a">
                {link.item}
              </Link>
            </li>
          ))}
          {auth ? (
            <li className="nav-li">
              <Link className="nav-a" onClick={signOut}>
                Logout
              </Link>
            </li>
          ) : (
            <li className="nav-li">
              <Link className="nav-a" onClick={collapse} to="/auth">
                Signin
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar2
