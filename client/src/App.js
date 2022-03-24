import './App.css';
import React from "react"
import LandingPage from './components/Landing/LandingPage';
import Home from './components/Home/Home';
import { Route,Routes} from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    // <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/countries" element={<Home/>}/>
      </Routes>
    </div> 
    // </Router>                  
  );
}

export default App;
