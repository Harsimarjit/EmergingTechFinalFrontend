import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">Nurse App</div>
          <div className="flex justify-around">
            <Link to="/login" className="bg-green-500">Login</Link>
            <Link to="/signup" className="bg-green-500">Sign Up</Link>
          </div>
        </nav>
      </div>
  );
}

export default App;
