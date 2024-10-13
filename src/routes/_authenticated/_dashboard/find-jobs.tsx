import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard/find-jobs')({
  component: () => (
    <div>Hello /(authenticated)/(dashboard)/_dashboard/find-jobs!</div>
  ),
})
