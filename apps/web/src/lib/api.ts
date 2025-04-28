import axios from "axios";
import { graphqlClient } from "./graphql-client";
import {
  GET_SECURITY_POSTURE,
  GET_INCIDENTS_BY_CLIENT,
  GET_VULNERABILITIES_BY_CLIENT,
} from "@/graphql/queries";

type Status = "open" | "closed" | "progress";
type Severity = "low" | "medium" | "high" | "critical";

export interface Client {
  clientId: string;
  organisationName: string;
  contactEmail: string;
}

export interface SecurityPosture {
  lastScanDate: Date;
  threatsDetected: number;
  riskScore: number;
  vulnerabilitiesFound: number;
  incidentsReported: number;
  reportDate: Date;
}

export interface Incident {
  title: string;
  description: string;
  status: Status;
  severity: Severity;
  reportedAt: Date;
}

export interface Vulnerability {
  title: string;
  severity: Severity;
  status: Status;
  category: string;
  cvssScore: number;
  remediationSteps: string;
  foundAt: Date;
}

const CLIENT_ID = "0943a96c-06cb-4f4e-a1b9-10e8b7e4f92c";

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
  if (!clientId) throw new Error("A Client ID is needed for this request");
  try {
    const { getSecurityPosture } = await graphqlClient.request<{
      getSecurityPosture: SecurityPosture;
    }>(GET_SECURITY_POSTURE, { clientId });
    return getSecurityPosture ?? {};
  } catch (error) {
    throw error;
  }
};

export const fetchIncidents = async (
  clientId?: string
): Promise<Incident[]> => {
  if (!clientId) throw new Error("A Client ID is needed for this request");
  try {
    const { getIncidentsByClientId } = await graphqlClient.request<{
      getIncidentsByClientId: Incident[];
    }>(GET_INCIDENTS_BY_CLIENT, { clientId });
    return getIncidentsByClientId ?? [];
  } catch (error) {
    throw error;
  }
};

export const fetchVulnerabilities = async (clientId?: string) => {
  if (!clientId) throw new Error("A Client ID is needed for this request");
  try {
    const { getVulnerabilitiesByClientId } = await graphqlClient.request<{
      getVulnerabilitiesByClientId: Vulnerability[];
    }>(GET_VULNERABILITIES_BY_CLIENT, { clientId });
    return getVulnerabilitiesByClientId ?? [];
  } catch (error) {
    throw error;
  }
};
