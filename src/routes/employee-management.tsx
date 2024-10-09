import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employee-management')({
  component: () => <div>Hello /employee-management!</div>,
})
