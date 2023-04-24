import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../features/counter/counterSlice'
import { useEffect } from 'react'

const About = () => {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth.value)

  useEffect(() => {}, [])
  const options = [
    { value: '', show: 'Please select' },
    { value: 'small', show: '1 to 10 employees' },
    { value: 'medium', show: '11 to 50 employees' },
    { value: 'large', show: '50+ employees' },
  ]

  return (
    <div>
      <h2>about</h2>
      counter: {count}
      <button className="btn" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        <form className="mb-0 space-y-6" onSubmit={e => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="label">
              Email address
            </label>
            <input type="email" className="" />
          </div>
          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input type="password" className="" />
          </div>
          <div>
            <label htmlFor="company-size">Company size</label>
            <div className="mt-1">
              <select name="company-size" id="company-size" className="input ">
                {options.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.show}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-gray-900 "
            >
              <input type="checkbox" id="terms" className="" />I agree to the{' '}
              <a href="#">Terms</a> and
              <a href="#">Privacy Policy</a>
            </label>
          </div>
          <div>
            <button className="btn">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default About
