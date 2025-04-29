import { EmptyState, VStack } from "@chakra-ui/react"
import { LuBox } from "react-icons/lu"

function EmptyComponent({ message }: { message: string }) {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <LuBox />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Description>{message}</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

export default EmptyComponent