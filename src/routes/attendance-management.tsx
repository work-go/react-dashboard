import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/attendance-management')({
  component: () => <div>Hello /attendance-management!</div>,
})
