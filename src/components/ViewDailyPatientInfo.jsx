import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DAILY_PATIENT_INFO } from '../graphql/queries';
import { Link } from 'react-router-dom';

const ViewDailyPatientInfo = () => {
  const userId = localStorage.getItem('userId');

  const { loading, error, data, refetch } = useQuery(GET_DAILY_PATIENT_INFO, {
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
    <div className="view-vital-container">
      <h2  className='bg-gray-800 px-4 py-6 flex justify-between'>
        <div className='text-3xl text-white'>View Daily Patient Information</div>
        <Link to="/patient" className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:text-indigo-600 hover:bg-white
            border-2 border-indigo-500 text-center' >Patient Dashboard</Link>
      </h2>
      <ul>
        {data.viewDailyPatientInfo.map((item) => (
          <li key={item.id} className='bg-gray-200 rounded-lg m-4 p-4'>
            <p>Blood Pressure: {item.bloodPressure}</p>
            <p>Pulse Rate: {item.pulseRate}</p>
            <p>Weight: {item.weight}</p>
            <p>temperature: {item.temperature}</p>
            <p>Respiratory Rate: {item.respiratoryRate}</p>
            <p className='font-semibold'>Submitted At:{formatSubmittedAt(item.createdAt)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewDailyPatientInfo;
