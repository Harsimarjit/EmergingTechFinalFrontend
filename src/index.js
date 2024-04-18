import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import NursePage from './pages/NursePage';
import PatientPage from './pages/PatientPage';
import AddNurseVitalSigns from './components/addNurseVitalSigns';
import ViewNurseVitalSigns from './components/viewNurseVitalSigns';
import AddDailyPatientInfo from './components/AddDailyPatientInfo';

const client = new ApolloClient(
  {
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache()
  }
  )
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nurse" element={<NursePage />} />
          <Route path="/nurse/add" element={<AddNurseVitalSigns />} />
          <Route path="/nurse/view" element={<ViewNurseVitalSigns />} />
          {/* <Route path="/nurse/conditions" element={<PossibleConditionsPage />} /> */}
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/patient/add-daily-info" element={<AddDailyPatientInfo />} />
          {/* <Route path="/patient/symptoms-checklist" element={<SymptomsChecklistPage />} /> */}
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
