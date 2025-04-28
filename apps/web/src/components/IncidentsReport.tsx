import React from 'react'
import IncidentsTimeline from '@/components/IncidentsTimeline';
import { Incident } from '@/lib/api';
import { Box } from '@chakra-ui/react';
import ReportHead from './ReportHead';

function IncidentsReport({ incidents }: { incidents: Incident[] }) {
  return (
    <Box>
      <ReportHead title="Incident report" href="/incidents" />
      <IncidentsTimeline incidents={incidents} />
    </Box>
  );
}

export default IncidentsReport