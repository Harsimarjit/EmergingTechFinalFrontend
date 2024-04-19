import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_NURSE_VITAL_SIGNS } from '../graphql/mutations';
import { Link } from 'react-router-dom';


const AddNurseVitalSigns = () => {

  const userId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    patientName: '',
    bodyTemperature: '',
    heartRate: '',
    bloodPressure: '',
    respiratoryRate: '',
  });

  console.log("User ID: ", userId);
  const [addNurseVitalSigns, { error }] = useMutation(ADD_NURSE_VITAL_SIGNS);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('No userId provided for addVitalSigns mutation.');
      return;
    }

    try {
      if (!formData.bodyTemperature || !formData.heartRate || !formData.bloodPressure || !formData.respiratoryRate) {
        throw new Error('Please fill in all fields.');
      }

      console.log("Submitting with userId:", userId);
      console.log("Form data:", formData);

      await addNurseVitalSigns({
        variables: {
          userId, 
          patientName: formData.patientName,
          bodyTemperature: parseFloat(formData.bodyTemperature),
          heartRate: parseInt(formData.heartRate, 10),
          bloodPressure: formData.bloodPressure,
          respiratoryRate: parseInt(formData.respiratoryRate, 10),
        },
      });

      setFormData({
        patientName: '',
        bodyTemperature: '',
        heartRate: '',
        bloodPressure: '',
        respiratoryRate: '',
      });

      console.log('Vital signs added successfully!');
      alert('Vital signs added successfully!');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="add-vital-container">
      <h2  className='bg-gray-800 px-4 py-6 flex justify-between'>
        <div className='text-3xl text-white'>Add Nurse Vital Signs</div>
        <Link to="/nurse" className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:text-indigo-600 hover:bg-white
            border-2 border-indigo-500 text-center' >Nurse Dashboard</Link>
      </h2>
      <form onSubmit={handleSubmit} className='bg-gray-200 rounded-lg m-4 p-4 text-center space-y-6'>
        <div className="space-x-2">
          <label className='font-semibold' htmlFor="patientName">Patient Name:</label>
          <input type="string" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} required/>
        </div>
        <div className="space-x-2">
          <label className='font-semibold' htmlFor="bodyTemperature">Body Temperature:</label>
          <input type="number" id="bodyTemperature" name="bodyTemperature" value={formData.bodyTemperature} onChange={handleChange} required/>
        </div>
        <div className="space-x-2">
          <label className='font-semibold' htmlFor="heartRate">Heart Rate:</label>
          <input type="number" id="heartRate" name="heartRate" value={formData.heartRate} onChange={handleChange} required/>
        </div>
        <div className="space-x-2">
          <label className='font-semibold' htmlFor="bloodPressure">Blood Pressure:</label>
          <input type="text" id="bloodPressure" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} required/>
        </div>
        <div className="space-x-2">
          <label className='font-semibold' htmlFor="respiratoryRate">Respiratory Rate:</label>
          <input type="number" id="respiratoryRate" name="respiratoryRate" value={formData.respiratoryRate} onChange={handleChange} required />
        </div>
        <button type="submit"  className='bg-green-600 text-white px-6 py-2 rounded-lg hover:text-green-600 hover:bg-white
            border-2 border-green-500 text-center' >Submit</button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default AddNurseVitalSigns;
