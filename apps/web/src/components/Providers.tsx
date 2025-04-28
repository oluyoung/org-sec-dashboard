'use client';
import React from "react";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "./chakra/provider";

const Providers = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      {children}
    </ChakraProvider>
  </QueryClientProvider>
);

export default Providers;