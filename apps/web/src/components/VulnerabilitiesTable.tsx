'use client';

import {
  Stack,
  Table,
  Text,
  Circle,
  Badge,
  HStack,
  For,
  VStack,
} from '@chakra-ui/react';
import { LuBox, LuCircleAlert } from 'react-icons/lu';
import { Vulnerability } from '@/lib/api';
import EmptyComponent from './EmptyComponent';

function VulnerabilitiesTable({ vulnerabilities }: { vulnerabilities: Vulnerability[] }) {
  if (!vulnerabilities.length) {
    return (
      <EmptyComponent message='Looking good. No vulnerabilities reported' />
    );
  }
  return (
    <Stack width="full" gap="5">
      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Severity</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>CVSS Score</Table.ColumnHeader>
            <Table.ColumnHeader>Found At</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <For each={vulnerabilities} fallback={(
            <VStack textAlign="center" fontWeight="medium">
              <LuBox />
              No incidents to show
            </VStack>
          )}>
            {(vulnerability) => {
              return (
                <Table.Row key={vulnerability.title}>
                  <Table.Cell>
                    <Text color="white">{vulnerability.title}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.400">{vulnerability.category}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack>
                      {vulnerability.severity === 'critical' ? (
                        <LuCircleAlert color="red" />
                      ) : (
                        <Circle
                          size="10px"
                          bg={
                            vulnerability.severity === 'low'
                              ? 'green.400'
                              : vulnerability.severity === 'medium'
                                ? 'yellow.400'
                                : 'red.400'
                          }
                        />
                      )}
                      <Text fontSize="sm" color="white">{vulnerability.severity}</Text>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorScheme={
                        vulnerability.status === 'open'
                          ? 'red'
                          : vulnerability.status === 'progress'
                            ? 'yellow'
                            : 'green'
                      }
                      variant="solid"
                    >
                      {vulnerability.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.400">{vulnerability.cvssScore}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" color="gray.400">
                      {new Date(vulnerability.foundAt).toLocaleDateString()}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              )
            }}
          </For>
        </Table.Body>
      </Table.Root>
    </Stack>
  );
}

export default VulnerabilitiesTable