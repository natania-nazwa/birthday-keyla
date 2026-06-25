import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bunga')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bunga"!</div>
}
