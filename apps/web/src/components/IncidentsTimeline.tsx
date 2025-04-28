'use client';
import { Box, Stack, Text, Timeline, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { LuBox } from 'react-icons/lu';
import { Incident } from '@/lib/api';

interface IncidentsTimelineProps {
  incidents: Incident[];
}

export default function IncidentsTimeline({ incidents = [] }: IncidentsTimelineProps) {
  const grouped = useMemo(() => incidents.reduce((acc, i) => {
    switch (i.status) {
      case 'closed':
        acc.closed.push(i);
        break;
      case 'progress':
        acc.progress.push(i);
        break;
      default:
        acc.open.push(i);
        break;
    }

    return acc;
  }, {
    closed: new Array<Incident>(),
    progress: new Array<Incident>(),
    open: new Array<Incident>()
  }), [incidents]);

  if (!incidents.length) {
    return (
      <VStack textAlign="center" fontWeight="medium">
        <LuBox />
        No incidents to show
      </VStack>
    );
  }

  const latest = {
    closed: grouped.closed[0] || {},
    progress: grouped.progress[0] || {},
    open: grouped.open[0] || {},
  };

  const steps = [
    { status: 'closed', title: 'Closed Incidents' },
    { status: 'progress', title: 'Resolving Incidents' },
    { status: 'open', title: 'Open Incidents' },
  ] as const;

  return (
    <Timeline.Root size={'xl'}>
      {steps.map(step => {
        const items = grouped[step.status];
        const latestItem = latest[step.status];

        return (
          <Timeline.Item key={step.status}>
            <Timeline.Connector>
              <Timeline.Separator />
              <Timeline.Indicator fontWeight="bold">
                {items.length}
              </Timeline.Indicator>
            </Timeline.Connector>
            <Timeline.Content>
              <Timeline.Title fontSize="xl" fontWeight="bold" color="red.400">
                {step.title}
              </Timeline.Title>
              <Timeline.Description color="white">
                <Stack gap={2}>
                  <Text fontStyle="italic">Latest Incident</Text>
                  <Text fontSize="md" color="gray.400">
                    {latestItem.title}
                  </Text>
                  <Text fontSize="sm">
                    {latestItem.description}
                  </Text>
                  <Text fontSize="xs">
                    Reported: {new Date(latestItem.reportedAt).toLocaleDateString()}
                  </Text>
                </Stack>
              </Timeline.Description>
              {latestItem ? (
                <Box>
                </Box>
              ) : (
                <Text fontSize="sm" color="gray.500">
                  Looks good, no incidents to report.
                </Text>
              )}
            </Timeline.Content>
          </Timeline.Item>
        );
      })}
    </Timeline.Root>
  );
}
