import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard/resume')({
  component: () => (
    <div>Hello /(authenticated)/(dashboard)/_dashboard/resume!</div>
  ),
})
