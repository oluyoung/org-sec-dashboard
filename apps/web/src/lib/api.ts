import axios from "axios";
import { graphqlClient } from './graphql-client';
import { GET_SECURITY_POSTURE, GET_INCIDENTS_BY_CLIENT, GET_VULNERABILITIES_BY_CLIENT } from '@/graphql/queries';

export interface Client {
  clientId: string;
  organisationName: string;
  contactEmail: string;
}

export interface SecurityPosture {
  clientId: string;
  lastScanDate: Date;
  threatsDetected: number;
  riskScore: number;
  vulnerabilitiesFound: number;
  incidentsReported: number;
  reportDate: Date;
}

const CLIENT_ID = "4338845b-e269-4b72-bffe-4cebda126b1f";

const axClient = axios.create({
  baseURL: "http://localhost:4000",
});

export const fetchClient = async () => {
  const { data } = await axClient.get<Client>(`/api/clients/me`, {
    headers: { "X-CLIENT-ID": CLIENT_ID },
  });
  return data;
};

export const fetchSecurityPosture = async (clientId?: string) => {
  if (!clientId) throw new Error('A Client ID is needed for this request');
  return graphqlClient.request(GET_SECURITY_POSTURE, { clientId });
};

export const fetchIncidents = async (clientId?: string) => {
  if (!clientId) throw new Error('A Client ID is needed for this request');
  return graphqlClient.request(GET_INCIDENTS_BY_CLIENT, { clientId });
};

export const fetchVulnerabilities = async (clientId?: string) => {
  if (!clientId) throw new Error('A Client ID is needed for this request');
  return graphqlClient.request(GET_VULNERABILITIES_BY_CLIENT, { clientId });
};