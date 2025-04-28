'use client';

import {
  ButtonGroup,
  IconButton,
  Pagination,
  Stack,
  Table,
  Text,
  Circle,
  Badge,
  HStack,
  For,
  VStack,
} from '@chakra-ui/react';
import { LuBox, LuChevronLeft, LuChevronRight, LuCircleAlert } from 'react-icons/lu';
import { Incident } from '@/lib/api';
import EmptyComponent from './EmptyComponent';

interface IncidentsTableProps {
  incidents: Incident[];
}

export default function IncidentsTable({ incidents }: IncidentsTableProps) {
  if (!incidents.length) {
    return (
      <EmptyComponent message='Looking good. No incidents reported' />
    );
  }

  return (
    <Stack width="full" gap="5">
      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Severity</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Reported Date</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <For each={incidents} fallback={(
            <VStack textAlign="center" fontWeight="medium">
              <LuBox />
              No incidents to show
            </VStack>
          )}>
            {(incident) => {
              return (
                <Table.Row key={incident.title}>
                  <Table.Cell>
                    <Text fontWeight="bold" color="white">{incident.title}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.400">{incident.description}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack>
                      {incident.severity === 'critical' ? (
                        <LuCircleAlert color="red" />
                      ) : (
                        <Circle
                          size="10px"
                          bg={
                            incident.severity === 'low'
                              ? 'green.400'
                              : incident.severity === 'medium'
                                ? 'yellow.400'
                                : 'red.400'
                          }
                        />
                      )}
                      <Text fontSize="sm" color="white">{incident.severity}</Text>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorScheme={
                        incident.status === 'open'
                          ? 'red'
                          : incident.status === 'progress'
                            ? 'yellow'
                            : 'green'
                      }
                      variant="solid"
                    >
                      {incident.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.400">
                      {new Date(incident.reportedAt).toLocaleDateString()}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              )
            }}
          </For>
        </Table.Body>
      </Table.Root>

      <Pagination.Root count={incidents.length * 5} pageSize={5} page={1}>
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton aria-label="Previous page">
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton key={page.value} variant={{ base: 'ghost', _selected: 'outline' }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton aria-label="Next page">
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Stack>
  );
}
