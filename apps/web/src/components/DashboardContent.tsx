'use client';

import { useMachine } from '@xstate/react';
import { dashboardMachine } from '../machines/dashboardMachine';
import { useQuery } from '@tanstack/react-query';
import SummaryGrid from '../components/SummaryGrid';
import DashboardCharts from '../components/DashboardCharts';
import { fetchClient, fetchSecurityPosture, fetchIncidents, fetchVulnerabilities, SecurityPosture, Client } from '@/lib/api';
import { Suspense } from 'react';

function DashboardPageContent() {
  const clientId = 'example-client-uuid'; // dynamic clientId
  const [state, send] = useMachine(dashboardMachine);

  const { data: postureData, isLoading: loadingPosture, isError: errorPosture } = useQuery({
    queryKey: ['security-posture', clientId],
    queryFn: () => fetchSecurityPosture(clientId),
    enabled: state.matches('loading'),
  });

  const { data: incidentsData, isLoading: loadingIncidents, isError: errorIncidents } = useQuery({
    queryKey: ['incidents', clientId],
    queryFn: () => fetchIncidents(clientId),
    enabled: state.matches('loading'),
  });

  const { data: vulnerabilitiesData, isLoading: loadingVulnerabilities, isError: errorVulnerabilities } = useQuery({
    queryKey: ['vulnerabilities', clientId],
    queryFn: () => fetchVulnerabilities(clientId),
    enabled: state.matches('loading'),
  });

  React.useEffect(() => {
    if (loadingPosture || loadingIncidents || loadingVulnerabilities) {
      send('FETCH');
    }

    if (
      !loadingPosture &&
      !loadingIncidents &&
      !loadingVulnerabilities &&
      postureData &&
      incidentsData &&
      vulnerabilitiesData
    ) {
      send('SUCCESS');
    }

    if (errorPosture || errorIncidents || errorVulnerabilities) {
      send({ type: 'FAILURE', error: 'Failed to fetch dashboard data' });
    }
  }, [
    loadingPosture,
    loadingIncidents,
    loadingVulnerabilities,
    postureData,
    incidentsData,
    vulnerabilitiesData,
    errorPosture,
    errorIncidents,
    errorVulnerabilities,
    send,
  ]);

  if (state.matches('idle') || state.matches('loading')) {
    return <div>Loading dashboard...</div>;
  }

  if (state.matches('failure')) {
    return (
      <div>
        Error loading dashboard.
        <button onClick={() => send('RETRY')}>Retry</button>
      </div>
    );
  }

  const posture = postureData?.getSecurityPosture;
  const incidents = incidentsData?.getIncidentsByClientId;
  const vulnerabilities = vulnerabilitiesData?.getVulnerabilitiesByClientId;

  return (
    <>
      {posture && <SummaryGrid posture={posture} />}
      <DashboardCharts
        chartData={[
          { name: 'Threats', value: posture.threatsDetected },
          { name: 'Vulnerabilities', value: posture.vulnerabilitiesFound },
          { name: 'Incidents', value: posture.incidentsReported },
        ]}
      />
      {/* Map incidents + vulnerabilities */}
    </>
  );
}
