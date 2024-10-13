import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard/dashboard')({
  component: () => (
    <div>Hello /(authenticated)/(dashboard)/_dashboard/dashboard!</div>
  ),
})
