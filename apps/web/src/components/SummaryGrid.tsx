'use client';
import { SecurityPosture } from '@/lib/api';
import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react';

export default function SummaryGrid({
  riskScore = 0,
  threatsDetected = 0,
  vulnerabilitiesFound = 0,
  incidentsReported = 0,
  lastScanDate,
  reportDate,
}: SecurityPosture) {

  const gridItems = [
    { label: 'Risk Score', value: riskScore },
    { label: 'Threats Detected', value: threatsDetected },
    { label: 'Vulnerabilities Found', value: vulnerabilitiesFound },
    { label: 'Incidents Reported', value: incidentsReported },
    { label: 'Last Scan Date', value: lastScanDate ? new Date(lastScanDate).toLocaleDateString() : '' },
    { label: 'Report Date', value: lastScanDate ? new Date(reportDate).toLocaleDateString() : '' },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap="8px" mb="8">
      {gridItems.map((item) => (
        <Box
          key={item.label}
          p="6"
          borderWidth="1px"
          borderRadius="lg"
          bg="gray.800"
          boxShadow="md"
          _hover={{ borderColor: 'red.400' }}
        >
          <VStack gap="8px" textAlign="center">
            <Text fontSize="lg" fontWeight="bold" color="red.400">
              {item.label}
            </Text>
            <Text fontSize="2xl" fontWeight="extrabold" color="white">
              {item.value ? item.value : 'N/A'}
            </Text>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
}