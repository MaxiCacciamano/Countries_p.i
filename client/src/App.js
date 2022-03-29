import './App.css';
import React from "react"
import LandingPage from './components/Landing/LandingPage';
import {Activities} from "./components/Activites/Activities.jsx"
import {Home} from './components/Home/Home';
import { Route,Routes} from 'react-router-dom';
import CountryId from './components/CountryById/CountryId.jsx'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    // <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/countries" element={<Home/>}/>
        <Route exact path="/activities" component={<Activities/>}/>
        <Route exact path="/countries/:id" component={<CountryId/>} />
      </Routes>
    </div> 
    // </Router>                  
  );
}

export default App;
