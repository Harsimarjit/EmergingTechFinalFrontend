import React from 'react';
import { Link } from 'react-router-dom';

const PatientPage = () => {
  return (
    <div>
    <h1 className='bg-gray-800 text-3xl py-6 text-white text-center'>Patient Dashboard</h1>

    <Link to="/patient/add-daily-info" className='bg-gray-200 rounded-lg px-4 py-8 m-6 font-semibold flex justify-between hover:bg-gray-300'>
      <div>Add Daily Patient Information</div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
      </div>
    </Link>

    <Link to="/patient/view-daily-info" className='bg-gray-200 rounded-lg px-4 py-8 m-6 font-semibold flex justify-between hover:bg-gray-300'>
      <div>View Daily Patient Information</div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
      </div>
    </Link>
  </div>
  )
}

export default PatientPage
