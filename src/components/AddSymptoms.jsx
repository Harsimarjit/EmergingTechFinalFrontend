import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SUBMIT_SYMPTOMS } from '../graphql/mutations';
import { Link } from 'react-router-dom';

const AddSymptoms = () => {
  const userId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    fever: false,
    cough: false,
    shortnessOfBreath: false,
    soreThroat: false,
    musclePain: false,
    lossOfTasteOrSmell: false,
    fatigue: false,
    diarrhea: false,
    nauseaOrVomiting: false,
  });

  console.log("User ID: ", userId);
  const [submitSymptoms, { error }] = useMutation(SUBMIT_SYMPTOMS);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('No userId provided for submitSymptoms mutation.');
      return;
    }

    try {
      console.log("Submitting with userId:", userId);
      console.log("Form data:", formData);

      await submitSymptoms({
        variables: {
          userId, 
          ...formData
        },
      });

      setFormData({
        fever: false,
        cough: false,
        shortnessOfBreath: false,
        soreThroat: false,
        musclePain: false,
        lossOfTasteOrSmell: false,
        fatigue: false,
        diarrhea: false,
        nauseaOrVomiting: false,
      });

      console.log('Symptoms submitted successfully!');
      alert('Symptoms submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  return (
    <div className="add-symptoms-container">
      <h2 className='bg-gray-800 px-4 py-6 flex justify-between'>
        <div className='text-3xl text-white'>Add Daily Patient Information</div>
        <Link to="/patient" className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:text-indigo-600 hover:bg-white border-2 border-indigo-500 text-center'>Patient Dashboard</Link>
      </h2>
      <form onSubmit={handleSubmit} className='bg-gray-200 rounded-lg m-4 p-4 text-center space-y-6'>
        <div className="space-y-4">
          <label className="flex items-center">
            <input type="checkbox" name="fever" checked={formData.fever} onChange={handleChange} className="mr-2" />
            Fever
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="cough" checked={formData.cough} onChange={handleChange} className="mr-2" />
            Cough
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="shortnessOfBreath" checked={formData.shortnessOfBreath} onChange={handleChange} className="mr-2" />
            Shortness of Breath
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="soreThroat" checked={formData.soreThroat} onChange={handleChange} className="mr-2" />
            Sore Throat
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="musclePain" checked={formData.musclePain} onChange={handleChange} className="mr-2" />
            Muscle Pain
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="lossOfTasteOrSmell" checked={formData.lossOfTasteOrSmell} onChange={handleChange} className="mr-2" />
            Loss of Taste or Smell
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="fatigue" checked={formData.fatigue} onChange={handleChange} className="mr-2" />
            Fatigue
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="diarrhea" checked={formData.diarrhea} onChange={handleChange} className="mr-2" />
            Diarrhea
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="nauseaOrVomiting" checked={formData.nauseaOrVomiting} onChange={handleChange} className="mr-2" />
            Nausea or Vomiting
          </label>
        </div>
        <button type="submit" className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:text-blue-600 hover:bg-white border-2 border-blue-500 text-center'>Submit Symptoms</button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default AddSymptoms;
