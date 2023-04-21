import './App.css'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/home'
import Restaurants from './components/restaurants'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="bg-blue-100  flex  flex-col  ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
