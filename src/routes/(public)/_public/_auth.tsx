import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/_public/_auth')({
  component: () => <Outlet />,
})
