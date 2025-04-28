import { Box, Heading } from '@chakra-ui/react';

export default function Header() {
  return (
    <Box as="header" p="4" bg="transparent" textAlign="center">
      <Heading as="h1" fontSize="20px" color="red.400">Cybersecurity Dashboard</Heading>
    </Box>
  );
}