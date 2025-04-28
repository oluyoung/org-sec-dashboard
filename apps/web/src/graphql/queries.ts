import { gql } from 'graphql-request';

export const GET_SECURITY_POSTURE = gql`
  query GetSecurityPosture($clientId: String!) {
    getSecurityPosture(clientId: $clientId) {
      riskScore
      threatsDetected
      vulnerabilitiesFound
      incidentsReported
      lastScanDate
      reportDate
    }
  }
`;

export const GET_INCIDENTS_BY_CLIENT = gql`
  query GetIncidentsByClientId($clientId: String!) {
    getIncidentsByClientId(clientId: $clientId) {
      title
      description
      severity
      status
      reportedAt
    }
  }
`;

export const GET_VULNERABILITIES_BY_CLIENT = gql`
  query GetVulnerabilitiesByClientId($clientId: String!) {
    getVulnerabilitiesByClientId(clientId: $clientId) {
      category
      title
      severity
      status
      cvssScore
      foundAt
    }
  }
`;
