import './App.css';
import Header from "./Header"
import Home from "./Home"
import Product from './Product';
import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';
function App() {
  return (
   // wrapped app in router
      <Router>
        <div className="app">
          <Header/> 
          <Routes>
          <Route path='/' element={<div><Home /></div>} />
          </Routes>
          <Routes>
          <Route path='/checkout' element={<div><Checkout/> </div>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
