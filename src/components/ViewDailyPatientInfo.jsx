import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_DAILY_PATIENT_INFO } from '../graphql/queries';

const ViewDailyPatientInfo = () => {
  const userId = localStorage.getItem('userId');

  const { loading, error, data } = useQuery(GET_DAILY_PATIENT_INFO, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="view-vital-container">
      <h2>View Previous Vital Signs</h2>
      {console.log(data.viewDailyPatientInfo[0].id)}
      {/* {console.log(data.viewDailyPatientInfo[0].bloodPressure)} */}
      <ul>
        {data.viewDailyPatientInfo.map((item) => (
          <li key={item.id}>
            <p>Blood Pressure: {item.bloodPressure}</p>
            <p>Pulse Rate: {item.pulseRate}</p>
            <p>Weight: {item.weight}</p>
            <p>temperature: {item.temperature}</p>
            <p>Respiratory Rate: {item.respiratoryRate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewDailyPatientInfo;
