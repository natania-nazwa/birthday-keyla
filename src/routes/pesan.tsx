import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pesan')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pesan"!</div>
}
