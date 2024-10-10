import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(authenticated)/(dashboard)/_dashboard/resume',
)({
  component: () => (
    <div>Hello /(authenticated)/(dashboard)/_dashboard/resume!</div>
  ),
})
