import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Awe, bars, down, up, xmark } from './icons'
import supabase from '../supabaseClient'
import { useSelector, useDispatch } from 'react-redux'
import { authorize, deauthorize } from '../features/auth/authSlice'

const Navbar = () => {
  const auth = useSelector(state => state.auth.value)
  const [collapse, setCollapse] = useState(true)
  const dispatch = useDispatch()
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

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
  const handleScroll = () => setCollapse(true)

  const signOut = async () => {
    await supabase.auth.signOut()
    dispatch(deauthorize())
    setCollapse(true)
    navigate('/logout_success')
  }

  useEffect(() => {
    console.log('value of auth b4', auth)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

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
    <div className="">
      <div className="flex justify-center sm:justify-end">
        {collapse ? (
          <a
            href="#"
            className="cursor-pointer hover:text-blue-800 block w-full hover:bg-blue-100 sm:flex sm:justify-center"
          >
            <Awe
              icon={bars}
              size="2x"
              onClick={toggle}
              className="w-full sm:hidden"
            />{' '}
          </a>
        ) : (
          <a
            href="#"
            className="cursor-pointer hover:text-blue-800 block w-full hover:bg-blue-100"
          >
            <Awe icon={xmark} size="2x" onClick={toggle} className="w-full" />
          </a>
        )}{' '}
      </div>
      <ul
        className={`sm:flex sm:justify-end border-2 bg-red-200
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
              onClick={() => setCollapse(true)}
              className=" block bg-slate-100 hover:bg-slate-200 p-2 sm:p-5 text-center z-600 "
              to={link.to}
            >
              {link.item}
            </Link>
          </li>
        ))}
        {auth ? (
          <li>
            <Link
              className="block bg-slate-100 hover:bg-slate-200 p-2 sm:p-5 text-center z-600 "
              onClick={signOut}
            >
              Logout
            </Link>
          </li>
        ) : (
          ''
        )}
      </ul>

      {/*  modal */}
      <div
        onClick={() => setCollapse(true)}
        className={` bg-slate-900 h-full absolute  w-full opacity-90 
        ${collapse ? 'hidden' : 'block'}
        `}
      ></div>

      {/* test new menu */}

      <div
        className={`duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0  md:w-auto  w-full flex items-center px-5
      ${!collapse ? 'top-[9%]' : 'top-[-100%]'}
      `}
      >
        <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
          <li>
            <a className="hover:text-gray-500" href="#">
              Products
            </a>
          </li>
          <li>
            <a className="hover:text-gray-500" href="#">
              Solution
            </a>
          </li>
          <li>
            <a className="hover:text-gray-500" href="#">
              Resource
            </a>
          </li>
          <li>
            <a className="hover:text-gray-500" href="#">
              Developers
            </a>
          </li>
          <li>
            <a className="hover:text-gray-500" href="#">
              Pricing
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
