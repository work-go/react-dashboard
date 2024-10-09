import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/payroll-management')({
  component: () => <div>Hello /payroll-management!</div>,
})
