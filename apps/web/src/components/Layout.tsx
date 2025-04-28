'use client';
import { PropsWithChildren } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/chakra/toaster';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Flex as="div" direction="column" minHeight="100vh">
      <Header />
      <Flex as="div" flex="1" p="8">
        <Sidebar />
        <Box as="main" flex="1" p="6" m="auto" maxWidth="1268px">
          {children}
        </Box>
      </Flex>
      <Toaster />
      <Footer />
    </Flex>
  )
}