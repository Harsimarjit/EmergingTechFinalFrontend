import { gql } from '@apollo/client';

export const GET_SYMPTOMS = gql`
  query GetSymptoms($userId: ID!) {
    viewSymptoms(userId: $userId) {
      id
      fever
      cough
      shortnessOfBreath
      soreThroat
      musclePain
      lossOfTasteOrSmell
      fatigue
      diarrhea
      nauseaOrVomiting
      submittedAt
    }
  }
`;
export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      id
      name
      email
      role
    }
  }
`;
export const GET_NURSE_VITAL_SIGNS = gql`
  query GetNurseVitalSigns($userId: ID!) {
    nurseVitalSigns(userId: $userId) {
      id
      patientName
      bodyTemperature
      heartRate
      bloodPressure
      respiratoryRate
      createdAt
    }
  }
`;
export const GET_DAILY_PATIENT_INFO = gql`
  query GetDailyPatientInfo($userId: ID!) {
    viewDailyPatientInfo(userId: $userId) {
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

export const GET_POSSIBLE_CONDITIONS = gql`
  query GetPossibleConditions($userId: ID!, $symptoms: [String!]!) {
    possibleConditions(userId: $userId, symptoms: $symptoms) {
      condition
      advice
    }
  }
`;
