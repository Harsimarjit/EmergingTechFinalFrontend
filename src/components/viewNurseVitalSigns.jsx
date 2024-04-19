import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NURSE_VITAL_SIGNS } from '../graphql/queries';
import { Link } from 'react-router-dom';

const ViewNurseVitalSigns = () => {
  const userId = localStorage.getItem('userId');

  const { loading, error, data, refetch } = useQuery(GET_NURSE_VITAL_SIGNS, {
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
      <h2 className='bg-gray-800 px-4 py-6 flex justify-between'>
        <div className='text-3xl text-white'>View Nurse Vital Signs</div>
        <Link to="/nurse" className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:text-indigo-600 hover:bg-white border-2 border-indigo-500 text-center'>Nurse Dashboard</Link>
      </h2>

      {data.nurseVitalSigns.length === 0 ? (
        <p className='bg-gray-200 rounded-lg m-4 p-4 h-32'>No vital signs data available.</p>
      ) : (
        <ul>
          {data.nurseVitalSigns.map((vitalSign) => (
            <li key={vitalSign.id} className='bg-gray-200 rounded-lg m-4 p-4'>
              <p className='font-semibold'>Patient Name: {vitalSign.patientName}</p>
              <p>Body Temperature: {vitalSign.bodyTemperature}</p>
              <p>Heart Rate: {vitalSign.heartRate}</p>
              <p>Blood Pressure: {vitalSign.bloodPressure}</p>
              <p>Respiratory Rate: {vitalSign.respiratoryRate}</p>
              <p className='font-semibold'>Submitted At:{formatSubmittedAt(vitalSign.createdAt)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewNurseVitalSigns;
