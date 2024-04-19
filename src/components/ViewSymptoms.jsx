import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SYMPTOMS } from '../graphql/queries';
import { Link } from 'react-router-dom';

const ViewSymptoms = () => {
  const userId = localStorage.getItem('userId');

  const { loading, error, data, refetch } = useQuery(GET_SYMPTOMS, {
    variables: { userId },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="bg-red-500 px-4 py-2 text-white" >Error: {error.message}</p>;

  const formatSubmittedAt = (submittedAt) => {
    const date = new Date(parseInt(submittedAt));
    return date.toLocaleString();
  };
  return (
    <div className="view-symptoms-container">
      <h2 className='bg-gray-800 px-4 py-6 flex justify-between'>
        <div className='text-3xl text-white'>View Symptoms</div>
        <Link to="/patient" className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:text-indigo-600 hover:bg-white border-2 border-indigo-500 text-center' >Patient Dashboard</Link>
      </h2>
      <ul>
        {data.viewSymptoms.map((item) => (
          <li key={item.id} className='bg-gray-200 rounded-lg m-4 p-4'>
            <p>Fever: {item.fever ? 'Yes' : 'No'}</p>
            <p>Cough: {item.cough ? 'Yes' : 'No'}</p>
            <p>Shortness of Breath: {item.shortnessOfBreath ? 'Yes' : 'No'}</p>
            <p>Sore Throat: {item.soreThroat ? 'Yes' : 'No'}</p>
            <p>Muscle Pain: {item.musclePain ? 'Yes' : 'No'}</p>
            <p>Loss of Taste or Smell: {item.lossOfTasteOrSmell ? 'Yes' : 'No'}</p>
            <p>Fatigue: {item.fatigue ? 'Yes' : 'No'}</p>
            <p>Diarrhea: {item.diarrhea ? 'Yes' : 'No'}</p>
            <p>Nausea or Vomiting: {item.nauseaOrVomiting ? 'Yes' : 'No'}</p>
            <p className='font-semibold'>Submitted At:{formatSubmittedAt(item.submittedAt)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewSymptoms;
