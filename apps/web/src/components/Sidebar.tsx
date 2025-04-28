import { Box, VStack, Text } from '@chakra-ui/react';

export default function Sidebar() {
  return (
    <Box
      as="aside"
      w="64"
      bg="transparent"
      borderRight="1px"
      borderColor="gray.700"
      py="16"
      px="16"
      color="red.400"
    >
      <VStack as="ul" align="start">
        <Text as="li">Dashboard</Text>
        <Text as="li">Clients</Text>
        <Text as="li">Reports</Text>
      </VStack>
    </Box>
  );
}
