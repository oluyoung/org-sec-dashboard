'use client';
import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { fetchClient, fetchSecurityPosture, fetchIncidents, fetchVulnerabilities, Client } from '@/lib/api';
import { HStack, Skeleton, VStack } from "@chakra-ui/react";
import VulnerabilityReport from '@/components/VulnerabilityReport';

const SummaryGrid = dynamic(() => import('@/components/SummaryGrid'));
const IncidentsReport = dynamic(() => import('@/components/IncidentsReport'));

export default function DashboardPage() {
  const { data: client } = useQuery<Client>({ queryKey: ['client'], queryFn: fetchClient });

  const { data: posture, isLoading: loadingPosture } = useQuery({
    queryKey: ['security-posture', client?.clientId],
    queryFn: () => fetchSecurityPosture(client?.clientId),
  });

  const { data: incidents, isLoading: loadingIncidents } = useQuery({
    queryKey: ['incidents', client?.clientId],
    queryFn: () => fetchIncidents(client?.clientId),
  });

  const { data: vulnerabilities, isLoading: loadingVulnerabilities } = useQuery({
    queryKey: ['vulnerabilities', client?.clientId],
    queryFn: () => fetchVulnerabilities(client?.clientId),
  });

  if (loadingPosture || loadingIncidents || loadingVulnerabilities) {
    return <Skeleton height={400} />;
  }

  return (
    <VStack>
      <Suspense fallback={<Skeleton height={100} />}>
        <SummaryGrid {...posture} />
      </Suspense>
      <HStack gap="6" alignItems="flex-start">
        <Suspense fallback={<Skeleton height={100} />}>
          <VulnerabilityReport vulnerabilities={vulnerabilities || []} />
        </Suspense>
        <Suspense fallback={<Skeleton height={100} />}>
          <IncidentsReport incidents={incidents || []} />
        </Suspense>
      </HStack>
    </VStack>
  );
}