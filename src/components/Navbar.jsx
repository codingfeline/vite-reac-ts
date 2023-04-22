import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Awe, down, up } from './icons'

const Navbar = () => {
  const auth = useSelector(state => state.auth.value)
  const [collapse, setCollapse] = useState(true)

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
    console.log('value of auth', auth)
  }, [])

  return (
    <div onBlur={() => toggle()}>
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
        )}
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
              className="block bg-slate-100 hover:bg-slate-200 p-2 sm:p-5 text-center"
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
