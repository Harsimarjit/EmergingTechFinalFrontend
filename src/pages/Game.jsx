import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Game = () => {
  const [postures, setPostures] = useState([
    { name: 'Mountain Pose', imageUrl: '/mountainPose.jpg' },
    { name: 'Tree Pose', imageUrl: '/treePose.jpg' },
    { name: 'Downward-Facing Dog', imageUrl: '/downwardFacingDogPose.jpg' },
    { name: 'Camel Pose', imageUrl: '/camelPose.jpg' },
    { name: 'Eagle Pose', imageUrl: '/eaglePose.jpg' },
    { name: 'Bow Pose', imageUrl: '/bowPose.jpg' },
    { name: 'Bridge Pose', imageUrl: '/bridgePose.jpg' },
    { name: 'Easy Pose', imageUrl: '/easyPose.png' },
    { name: 'Warrior I Pose', imageUrl: '/warrior1.jpg' },
    { name: 'Warrior II Pose', imageUrl: '/warrior2.jpg' },
  ]);
  const [currentPostureIndex, setCurrentPostureIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          setCurrentPostureIndex((prevIndex) =>
            prevIndex === postures.length - 1 ? 0 : prevIndex + 1
          );
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPostureIndex, postures.length]);

  const handleSkip = () => {
    // Increment current posture index
    setCurrentPostureIndex((prevIndex) =>
      prevIndex === postures.length - 1 ? 0 : prevIndex + 1
    );
    // Reset time left
    setTimeLeft(30);
  };

  return (
    <div className='bg-gray-100'>
      <h1 className='bg-gray-800 text-3xl py-6 text-white text-center'>Yoga Game </h1>
      <div className=' mx-4 my-4 '>
        <Link to="/" className='bg-indigo-600 text-white  px-4 py-2 rounded-lg hover:text-indigo-600 hover:bg-white
            border-2 border-indigo-500 text-center' >Home</Link>
      </div>
      <h2 className="text-lg text-center text-orange-600 font-semibold mb-10">Time Left: 
      <span className='font-bold bg-orange-100 p-6 m-2 border-2 border-orange-500 rounded-full'>{timeLeft}</span> seconds</h2>
      <div className="mt-4 py-4 bg-orange-100 text-center h-screen mx-4 rounded-lg px-4 border-2 border-orange-500
      flex justify-around">
        <div>

        <h2 className="text-lg font-bold text-gray-900">Current Posture: {postures[currentPostureIndex].name}</h2>
        <button onClick={handleSkip} className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg 
        hover:text-orange-600 hover:bg-white border-2 border-orange-500">Skip</button>
        </div>
        <div>
        <img
          src={process.env.PUBLIC_URL + postures[currentPostureIndex].imageUrl}
          alt={postures[currentPostureIndex].name}
          className="w-96 object-cover rounded-lg shadow-lg bg-green-100 mx-auto" 
        />
        </div>

      </div>
    </div>
  );
};

export default Game;
