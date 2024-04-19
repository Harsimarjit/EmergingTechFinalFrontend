import React from 'react';
import {Link } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <div className='bg-gray-800 text-3xl py-6 text-white text-center'>Nurse & Patient Monitoring App</div>
        <nav className="bg-gradient-to-r from-green-400 to-blue-500 py-6">
          <div className="flex justify-around">
            <Link to="/login" className="bg-gray-800 rounded-lg px-6 py-4 text-white">Login</Link>
            <Link to="/signup" className="bg-gray-800 rounded-lg px-6 py-4 text-white">Sign Up</Link>
          </div>
        </nav>
        <div className='bg-gray-200 rounded-lg m-2 p-4 h-64'>Welcome to the nurse and patient monitoring app.</div>
        <div className=' mx-4 my-12 text-center'>
          <Link to="/game" className=" bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 
           rounded-lg px-16 py-8 text-white w-full">Lets Play a Game!</Link>
        </div>

      </div>
  );
}

export default App;
