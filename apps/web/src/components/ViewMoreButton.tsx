'use client';
import React from 'react';
import { Link } from "@chakra-ui/react";
import NextLink from 'next/link';
import { LuArrowRight } from 'react-icons/lu';

function ViewMoreButton({ href, title }: { href: string; title: string }) {
  return (
    <Link asChild><NextLink href={href}>View&nbsp;{title} <LuArrowRight /></NextLink></Link>
  );
}

export default ViewMoreButton