'use client';
import { Incident } from '@/lib/api';
import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { fetchClient, fetchIncidents, Client } from '@/lib/api';
import { Heading, Skeleton } from "@chakra-ui/react";

const IncidentsTable = dynamic(() => import('@/components/IncidentsTable'));

export default function DashboardPage() {
  const { data: client } = useQuery<Client>({ queryKey: ['client'], queryFn: fetchClient });

  const { data: incidents, isLoading: loadingIncidents } = useQuery<Incident[]>({
    queryKey: ['incidents'],
    queryFn: () => fetchIncidents(client?.clientId),
  });

  if (loadingIncidents) {
    return <Skeleton height={400} />;
  }

  return (
    <>
      <Heading as="h1" mb="8">Incidents List</Heading>
      <Suspense fallback={<Skeleton height={200} />}>
        <IncidentsTable incidents={incidents || []} />
      </Suspense>
    </>
  );
}