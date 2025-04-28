'use client';
import { Suspense, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { fetchClient, fetchSecurityPosture, fetchIncidents, fetchVulnerabilities, SecurityPosture, Client } from '@/lib/api';
import { Skeleton } from "@chakra-ui/react";

const DashboardCharts = dynamic(() => import('@/components/DashboardCharts'));
const SummaryGrid = dynamic(() => import('@/components/SummaryGrid'));

export default function DashboardPage() {
  const { data: client, refetch } = useQuery<Client>({ queryKey: ['client'], queryFn: fetchClient });

  const { data: postureData, isLoading: loadingPosture } = useQuery({
    queryKey: ['security-posture'],
    queryFn: () => fetchSecurityPosture(client?.clientId),
  });

  const { data: incidentsData, isLoading: loadingIncidents } = useQuery({
    queryKey: ['incidents'],
    queryFn: () => fetchIncidents(client?.clientId),
  });

  // const { data: vulnerabilitiesData, isLoading: loadingVulnerabilities } = useQuery({
  //   queryKey: ['vulnerabilities'],
  //   queryFn: () => fetchVulnerabilities(client?.clientId),
  // });

  const posture = postureData?.getSecurityPosture;
  // const incidents = incidentsData?.getIncidentsByClientId;
  // const vulnerabilities = vulnerabilitiesData?.getVulnerabilitiesByClientId;

  const chartData = useMemo(() => {
    if (!posture) return [];
    return [
      { name: 'Risk Score', value: posture.riskScore },
      { name: 'Threats', value: posture.threatsDetected },
      { name: 'Vulnerabilities', value: posture.vulnerabilitiesFound },
      { name: 'Incidents', value: posture.incidentsReported },
    ];
  }, [posture]);

  if (loadingPosture) {
    return <Skeleton height={400} />;
  }

  return (
    <>
    <Suspense fallback={<Skeleton height={100} />}>
      <SummaryGrid {...posture} />
    </Suspense>
    <Suspense fallback={<Skeleton height={200} />}>
      <DashboardCharts chartData={chartData} refreshData={refetch} />
    </Suspense>
    </>
  );
}