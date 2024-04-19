import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($name: String!,$email: String!, $password: String!, $role: String!) {
    addUser(name:$name, email: $email, password: $password, role: $role) {
      id
      name
      email
      role
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      role
      token
    }
  }
`;
export const ADD_NURSE_VITAL_SIGNS = gql`
  mutation AddNurseVitalSigns($userId: ID!, $patientName: String!, $bodyTemperature: Float!, $heartRate: Int!, $bloodPressure: String!, $respiratoryRate: Int!) {
    addNurseVitalSigns(userId: $userId,patientName:$patientName, bodyTemperature: $bodyTemperature, heartRate: $heartRate, bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate) {
      id
      userId
      patientName
      bodyTemperature
      heartRate
      bloodPressure
      respiratoryRate
      createdAt
    }
  }
`;
export const ADD_DAILY_PATIENT_INFO = gql`
  mutation AddDailyPatientInfo($userId: ID!, $pulseRate: Int!, $bloodPressure: String!, $weight: Float!, $temperature: Float!, $respiratoryRate: Int!) {
    addDailyPatientInfo(userId: $userId, pulseRate: $pulseRate, bloodPressure: $bloodPressure, weight: $weight, temperature: $temperature, respiratoryRate: $respiratoryRate) {
      id
      pulseRate
      bloodPressure
      weight
      temperature
      respiratoryRate
      createdAt
    }
  }
`;

export const SUBMIT_SYMPTOMS = gql`
  mutation SubmitSymptoms($userId: ID!, $symptoms: [String!]!) {
    submitSymptoms(userId: $userId, symptoms: $symptoms) {
      id
      symptoms
      submittedAt
    }
  }
`;