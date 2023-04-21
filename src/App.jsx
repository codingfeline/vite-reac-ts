import './App.css'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './components/about'
import AuthBox from './components/auth'
import Restaurants from './components/restaurants'
import OneRestaurant from './components/OneRestaurant'

function App() {
  return (
    <Router>
      <div className="ns_box bg-purple-300 flex flex-col h-screen justify-between">
        <Navbar />
        <div className="bg-lime-100  flex  flex-col mb-auto   ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<AuthBox />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:id" element={<OneRestaurant />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
