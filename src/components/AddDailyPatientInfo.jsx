import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DAILY_PATIENT_INFO } from '../graphql/mutations';

import { Link } from 'react-router-dom';

const AddDailyPatientInfo = () => {
  const [formData, setFormData] = useState({
    pulseRate: '',
    bloodPressure: '',
    weight: '',
    temperature: '',
    respiratoryRate: '',
  });

  const [addDailyPatientInfo, { loading, error }] = useMutation(ADD_DAILY_PATIENT_INFO);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
  
    console.log("Submitting the following data:", {
      userId,
      pulseRate: parseInt(formData.pulseRate),
      bloodPressure: formData.bloodPressure,
      weight: parseFloat(formData.weight),
      temperature: parseFloat(formData.temperature),
      respiratoryRate: parseInt(formData.respiratoryRate),
    });
  
    if (!userId || isNaN(formData.pulseRate) || isNaN(formData.weight) || isNaN(formData.temperature) || isNaN(formData.respiratoryRate)) {
      console.error('Invalid form data. Please check your input.');
      return;
    }
  
    addDailyPatientInfo({
      variables: {
        userId,
        pulseRate: parseInt(formData.pulseRate),
        bloodPressure: formData.bloodPressure,
        weight: parseFloat(formData.weight),
        temperature: parseFloat(formData.temperature),
        respiratoryRate: parseInt(formData.respiratoryRate),
      },
    });
  };
  

  return (
    <div>
      <h2  className='bg-gray-800 px-4 py-6 flex justify-between'>
        <div className='text-3xl text-white'>Add Daily Patient Information</div>
        <Link to="/patient" className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:text-indigo-600 hover:bg-white
            border-2 border-indigo-500 text-center' >Patient Dashboard</Link>
      </h2>
     
      <form onSubmit={handleSubmit}  className='bg-gray-200 rounded-lg m-4 p-4 text-center space-y-6' >
        <div className="space-x-2">
          <label className='font-semibold' htmlFor="pulseRate">Pulse Rate:</label>
          <input id="pulseRate" name="pulseRate" type="number" value={formData.pulseRate} onChange={handleChange} required/>
        </div>
        <div className="space-x-2">
          <label className='font-semibold' htmlFor="bloodPressure">Blood Pressure:</label>
          <input
            id="bloodPressure" name="bloodPressure" type="text" value={formData.bloodPressure} onChange={handleChange} required />
        </div>
        <div className="space-x-2">
          <label className='font-semibold' htmlFor="weight">Weight:</label>
          <input id="weight" name="weight" type="number" value={formData.weight} onChange={handleChange} required
          />
        </div>
        <div className="space-x-2">
          <label className='font-semibold' htmlFor="temperature">Temperature:</label>
          <input id="temperature" name="temperature" type="number" value={formData.temperature} onChange={handleChange} required
          />
        </div>
        <div className="space-x-2">
          <label className='font-semibold' htmlFor="respiratoryRate">Respiratory Rate:</label>
          <input id="respiratoryRate" name="respiratoryRate" type="number" 
          value={formData.respiratoryRate} onChange={handleChange} required/>
        </div>
        <button type="submit" className='bg-green-600 text-white px-6 py-2 rounded-lg hover:text-green-600 hover:bg-white
            border-2 border-green-500 text-center' >Submit Daily Patient Info</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error occurred: {error.message}</p>}
    </div>
  );
};

export default AddDailyPatientInfo;
