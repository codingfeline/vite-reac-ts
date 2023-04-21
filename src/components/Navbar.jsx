import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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

  useEffect(() => {
    console.log('value of auth', auth)
  }, [])

  return (
    <div>
      <button className="btn" onClick={() => setCollapse(!collapse)}>
        Toggle
      </button>
      {collapse ? (
        <ul className="grid sm:grid-cols-5 sm:border sm:border-pink-600">
          {links.map(link => (
            <li key={link.item}>
              <Link
                className="block bg-slate-100 hover:bg-slate-200 p-2 sm:p-5 text-center"
                to={link.to}
              >
                {link.item}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid sm:grid-cols- sm:border sm:border-pink-600">
          {links.map(link => (
            <li key={link.item}>
              <Link
                className="block bg-slate-100 hover:bg-slate-200 p-2 sm:p-5 text-center"
                to={link.to}
              >
                {link.item}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {`auth: ${auth}`}
    </div>
  )
}

export default Navbar
