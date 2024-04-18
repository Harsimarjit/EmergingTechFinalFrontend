import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_NURSE_VITAL_SIGNS } from '../graphql/queries';

const ViewNurseVitalSigns = () => {
  const userId = localStorage.getItem('userId');

  const { loading, error, data } = useQuery(GET_NURSE_VITAL_SIGNS, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="view-vital-container">
      <h2>View Previous Vital Signs</h2>
      <ul>
        {data.nurseVitalSigns.map((vitalSign) => (
          <li key={vitalSign.id}>
            <p>Body Temperature: {vitalSign.bodyTemperature}</p>
            <p>Heart Rate: {vitalSign.heartRate}</p>
            <p>Blood Pressure: {vitalSign.bloodPressure}</p>
            <p>Respiratory Rate: {vitalSign.respiratoryRate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewNurseVitalSigns;
