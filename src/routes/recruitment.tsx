import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recruitment')({
  component: () => <div>Hello /recruitment!</div>,
})
