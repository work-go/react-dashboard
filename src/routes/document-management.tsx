import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/document-management')({
  component: () => <div>Hello /document-management!</div>,
})
