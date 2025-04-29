import { Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import ViewMoreButton from './ViewMoreButton'

function ReportHead({ title, href }: { title: string; href: string }) {
  return (
    <HStack justifyContent="space-between" alignItems="flex-start">
      <Heading as="h4" mb="8">{title}</Heading>
      <ViewMoreButton href={href} title={title} />
    </HStack>
  )
}

export default ReportHead