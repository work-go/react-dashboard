import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(authenticated)/(dashboard)/_dashboard/applications',
)({
  component: () => (
    <div>Hello /(authenticated)/(dashboard)/_dashboard/applications!</div>
  ),
})
