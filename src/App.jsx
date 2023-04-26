import './App.css'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
// prettier-ignore
import { About, AuthBox, AuthGit, Footer, Home, Navbar, OneRestaurant, Restaurants } from './components'
import Loggedout from './components/loggedout'
import Navbar2 from './components/Navbar2'

function App() {
  return (
    <Router>
      <div className="ns_box bg-lime-200 flex flex-col h-screen justify-between">
        <Navbar2 />
        <div className="bg-lime-100  flex  flex-col mb-auto p-3 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<AuthBox />} />
            <Route path="/authGit" element={<AuthGit />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:id" element={<OneRestaurant />} />
            <Route path="/logout_success" element={<Loggedout />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
