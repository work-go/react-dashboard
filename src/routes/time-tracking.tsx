import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/time-tracking')({
  component: () => <div>Hello /time-tracking!</div>,
})
