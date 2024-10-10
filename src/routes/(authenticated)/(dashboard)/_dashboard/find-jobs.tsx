import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(authenticated)/(dashboard)/_dashboard/find-jobs',
)({
  component: () => (
    <div>Hello /(authenticated)/(dashboard)/_dashboard/find-jobs!</div>
  ),
})
