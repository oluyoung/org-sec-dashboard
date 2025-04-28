import { Box, List, Link } from '@chakra-ui/react';
import NextLink from "next/link";

export default function Sidebar() {
  const menus = [
    { name: 'Dashboard', href: '/' },
    { name: 'Incidents', href: '/incidents' },
    { name: 'Vulnerabilities', href: '/vulnerability' },
  ];
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
      <List.Root as="ul" align="start">
        {menus.map(m => (
          <List.Item key={m.name}>
            <Link asChild>
              <NextLink href={m.href}>{m.name}</NextLink>
            </Link>
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
}
