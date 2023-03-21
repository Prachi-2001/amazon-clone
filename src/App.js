import './App.css';
import Header from "./Header"
import Home from "./Home"
import Product from './Product';
import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
function App() {
  return (
   // wrapped app in router
      <Router>
        <div className="app">
          
          <Routes>
          <Route path='/' element={<div><Header/> <Home /></div>} />
          </Routes>
          <Routes>
          <Route path='/login' element={<div><Login/></div>} />
          </Routes>
          <Routes>
          <Route path='/checkout' element={<div><Header/> <Checkout/> </div>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
