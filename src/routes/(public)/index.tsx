import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/')({
  component: () => <div>Hello /!</div>,
})
